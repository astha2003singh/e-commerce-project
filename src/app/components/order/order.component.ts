import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  imports: [CommonModule, FormsModule]
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];
  orderPlaced = false;
  orderNumber = '';
  
  orderData = {
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: ''
  };

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    
    // Redirect to cart if no items
    if (this.cartItems.length === 0) {
      this.router.navigate(['/cart']);
    }
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  placeOrder() {
    // Generate a random order number
    this.orderNumber = 'ORD' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Clear cart
    this.cartService.clearCart();
    
    // Show success message
    this.orderPlaced = true;
  }
}