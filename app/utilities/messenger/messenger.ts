import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import net, { Socket } from 'net';

const port = Number(process.env.SERVER_PORT) || 1216;

export abstract class Messenger {
  private readonly unsubscribe = new Subject<void>();
  private readonly subjects: Record<string, Subject<any>> = {};

  private subject(queue: string): Subject<any> {
    if (this.subjects[queue]) return this.subjects[queue];
    return (this.subjects[queue] = new Subject());
  }

  protected onMessage(buffer: string | Buffer) {
    const message = JSON.parse(String(buffer));
    this.subject(message.queue).next(message.body);
  }

  public abstract publish(queue: string, body: any): void;

  public subscribe(queue: string, callback: (data: any) => void): Subscription {
    return this.subject(queue)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(callback);
  }

  public stop() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}

export class ClientMessenger extends Messenger {
  private readonly socket = net
    .connect(port)
    .on('data', this.onMessage.bind(this));

  public publish(queue: string, body: any) {
    this.socket.write(JSON.stringify({ queue, body }));
  }
}

export class ServerMessenger extends Messenger {
  private readonly ipc = net
    .createServer(this.onConnection.bind(this))
    .listen(port)
    .on('close', this.onClose.bind(this));

  private socket: Socket | undefined;

  private onConnection(socket: Socket) {
    this.socket = socket.on('data', this.onMessage.bind(this));
  }

  private onClose() {
    this.socket?.destroy();
  }

  public publish(queue: string, body: any) {
    this.socket?.write(JSON.stringify({ queue, body }));
  }
}
