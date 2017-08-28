import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
    selector: '[read-more]'
})
 export class MoreDirective {
    showChar: number = 140;
    ellipsis: string = '...';
    originalContent: string;
    psuedoContent: string;
    subcontent: string;
    element:any;
    constructor(elem:ElementRef){
        this.element = elem;        
    }

    ngOnInit(){
        this.originalContent = this.element.nativeElement.innerHTML;

        if(this.originalContent.length > this.showChar){
            this.subcontent = this.originalContent.substr(0, this.showChar);
            this.psuedoContent = this.subcontent + this.ellipsis;
            this.element.nativeElement.innerHTML = this.psuedoContent;
        }
        // console.log(this.originalContent);
    }
 }