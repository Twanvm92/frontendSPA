import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router, Params} from "@angular/router";
import {StoreService} from "../store.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
  selector: 'app-store-edit',
  templateUrl: './store-edit.component.html',
  styleUrls: ['./store-edit.component.css']
})
export class StoreEditComponent implements OnInit {
  id: string;
  editMode = false;
  storeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private storeService: StoreService,
              private router: Router,
              private dataStorageService: DataStorageService) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
      );
  }

  onSubmit() {
    if (this.editMode) {
      this.dataStorageService.updateStore(this.storeForm.value);
    } else {
      const str = JSON.stringify(this.storeForm.value);
      console.log(str);
      this.dataStorageService.addStore(this.storeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['stores']);
  }

  private initForm() {
    let id = '';
    let title = '';
    let address = '';
    let imagePath = '';

    if (this.editMode) {
      const store = this.storeService.getStore(this.id);
      id = store._id;
      title = store.title;
      address = store.address;
      imagePath = store.imagePath;
    }

    this.storeForm = new FormGroup({
      '_id': new FormControl(id),
      'title': new FormControl(title, Validators.required),
      'address': new FormControl(address, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
    });
  }

}
