import { Subject } from 'rxjs';

export interface Message<Body = any> {
  queue: string;
  body: Body;
}
