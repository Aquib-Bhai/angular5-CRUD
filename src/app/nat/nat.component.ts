import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup }  from '@angular/forms';

import { NatService } from '../nat.service';
import { Nat } from '../nat';

@Component({
  selector: 'app-nat',
  templateUrl: './nat.component.html',
  styleUrls: ['./nat.component.css']
})
export class NatComponent implements OnInit {

	allNats: Nat[];
	natIdToUpdate = null;
	statusCode: number;
  requestProcessing = false;

	natForm = new FormGroup ({
		'username': new FormControl(''),
		'email': new FormControl('')
	});

  constructor(private natService: NatService) { 
  }

  ngOnInit(): void {
  		this.getAllNats();
  }

  getAllNats(){
  		this.natService.getAllNats()
  		.subscribe(
  		data => this.allNats = data
  		);
  }

  		onNatSubmit(){
  				let nat = this.natForm.value;
  					
 
  				if(this.natIdToUpdate === null) {

  					this.natService.getAllNats()
  					.subscribe(nats => {

  						let maxIndex = nats.length - 1;
  						let natMaxIndex = nats[maxIndex];
  						let natId = natMaxIndex.id + 1;
  						nat.id = natId;


  						this.natService.createNat(nat)
  						.subscribe(successCode => {
							this.statusCode = successCode;
  							this.getAllNats();
  							this.backToCreateNat();}
  						
  									);

  										}
  								);
  				} else {
  						nat.id = this.natIdToUpdate;
  						this.natService.updateNat(nat)
  						.subscribe(successCode => {
		            		this.statusCode = successCode;
  							    this.getAllNats();
  							    this.backToCreateNat();  }

  						);
  				
  				}

  				
  		}

		loadNatToEdit(natId: string){
      /*
			this.natService.getNatById(natId)
			.subscribe(nat => {
				this.natIdToUpdate = nat.id;
				this.natForm.setValue({ username: nat.username, email: nat.email});
          
          this.requestProcessing = false;
			     },
          errorCode =>  this.statusCode = errorCode);
      */    
		}

    deleteNat(natId: string){
      this.natService.deleteNatById(natId)
      .subscribe(successCode => {
            this.statusCode = 204;
            this.getAllNats();
            this.backToCreateNat();
            },
            errorCode => this.statusCode = errorCode);

    }

		backToCreateNat(){
			this.natIdToUpdate = null;
			this.natForm.reset();
		}

  		
}
