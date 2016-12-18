import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { ToDoComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule,  FormsModule, HttpModule],
  declarations: [ ToDoComponent ],
  bootstrap:    [ ToDoComponent ]
})
export class AppModule { }
