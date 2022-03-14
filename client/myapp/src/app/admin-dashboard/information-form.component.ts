import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LogstatusService } from '../logstatus.service';
import { SigninService } from '../userlog-service/signin.service';
import { store } from './store/store'
import { addDataAction, updateItem } from './store/action';


@Component({
  selector: 'app-information-form',
  templateUrl: `./information-form.component.html`,
  styleUrls: ['./information-form.component.css']
})
export class InformationFormComponent implements OnDestroy {
  // @Output() formData: EventEmitter<any> = new EventEmitter()
  message: string = "Create New Contact"
  responseMsg: string = ""
  informationForm: FormGroup;
  complaintDate: Number = Date.now()
  file: any;
  subscription: Subscription[] = []
  forEditData: any

  constructor(private fb: FormBuilder, private router: Router, private client: SigninService, private logstatus: LogstatusService) {

    this.informationForm = fb.group({
      'department': ['', Validators.required],
      'position': ['', Validators.required],
      'name': ['', Validators.required],
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'description': ['', Validators.compose([Validators.maxLength(10), Validators.required])]
    })

  }
  onSubmit() {
    //getting value of form
    let user = { ...this.informationForm.value, postdate: this.complaintDate }
    //if file is uploaded
    if (this.file) {
      user.file = this.file;
    }

    //creating new contact information
    if (this.message === "Create New Contact" && (!this.forEditData)) {
      this.subscription[0] = this.client.postContact(user).subscribe((res: any) => {
        if (res.success) {
          store.dispatch(addDataAction(res.data))
          this.message = "Successfully Created Contact"
        } else {
          this.message = res.message
        }
        setTimeout(() => {
          this.message = "Create New Contact"
        }, 2000)
        this.informationForm.reset()
      })

    }
    if (this.message === "Edit Contact Information" && (this.forEditData)) {
      this.subscription[1] = this.client.updateContactById(this.forEditData._id, user).subscribe((res: any) => {
        if (res.data.acknowledged) {
          user._id = this.forEditData._id
          store.dispatch(updateItem(user))
          this.message = "Successfully Updated Contact"
          this.forEditData = null;
          setTimeout(() => {
            this.message = "Create New Contact"
          }, 2000)
          this.informationForm.reset()
        }
      })
    }
  }

  editContact(data: any) {
    this.message = "Edit Contact Information"
    const toEditItem = store.getState().data.filter(item => item._id === data.id)[0]
    this.informationForm.patchValue({
      department: toEditItem.department,
      position: toEditItem.position,
      name: toEditItem.name,
      email: toEditItem.email,
      phone: toEditItem.phone,
      description: toEditItem.description

    })

    this.forEditData = toEditItem
  }

  cancelUpdate() {
    this.message = "Create New Contact"
    this.forEditData = null;
  }
  goBack() {
    this.router.navigate(['admin/home'])

  }

  handleFileUpload(event: any) {
    this.file = event.target.files.item(0);
    // console.log(this.file)

  }
  ngOnDestroy() {
    this.subscription.forEach(subs => subs.unsubscribe())

  }

}


