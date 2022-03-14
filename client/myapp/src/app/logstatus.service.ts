import { Injectable , EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogstatusService {
  hideTab$ = new EventEmitter<boolean>()
  role$ = new EventEmitter<string>()
  
  constructor() {
}

   
}
