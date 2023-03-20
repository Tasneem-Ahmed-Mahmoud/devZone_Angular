import { Component  , OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDataService } from 'src/app/services/user-data.service';
import { ServiceOrderService } from '../services/service-order.service';


@Component({
  selector: 'app-service-dashboard',
  templateUrl: './service-dashboard.component.html',
  styleUrls: ['./service-dashboard.component.css']
})
export class ServiceDashboardComponent implements OnInit{
 
  userOrdersList : any[] = [];
  message :any  = {};
  constructor( private _SeviceOrder: ServiceOrderService , private _OrderService: ServiceOrderService
    ,private userData :UserDataService , private activatedRoute : ActivatedRoute
    , private toastr: ToastrService){
  }

  id : any = this.userData.userData().id ;
  orderId = this.activatedRoute.snapshot.params["id"];

ngOnInit(): void {
  this.getUserOrders();
  this.deleteUserOrder();
  
}

// get user order////////////////////////////////////////////////////////////
getUserOrders(){
  this._OrderService.getUserOrder().subscribe((res)=>{
    this.userOrdersList = res.orders
    console.log(this.id);
    console.log(res );
     
  })
}
//////////////////////////////////////////////////////////////////////////////////
//delete user order
deleteUserOrder(){
  this._OrderService.deleteOrder(this.orderId).subscribe((res)=>{
    console.log(res);
    this.message = res ;
    // this.ngOnInit();
    this.toastr.success("success")
    
  })
}
}
