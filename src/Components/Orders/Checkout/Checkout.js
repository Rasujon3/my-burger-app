import React, { Component } from "react";
import { Button } from "reactstrap";

import axios from "axios";

import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

class Checkout extends Component {
    state = {
        values: {
            delivaryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        }
    }
    goBack = () => {
        this.props.history.goBack("/");
    }
    inputChangeHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }
    submitHandler = () => {
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        axios.post("https://burger-builder-8ec9b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json", order)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    render() {
        return (
            <div>
                <h4 style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                }}>Payment : {this.props.totalPrice} BDT</h4>

                <form style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                }}>
                    <textarea onChange={(e) => this.inputChangeHandler(e)} name="delivaryAddress" value={this.state.values.delivaryAddress} className="form-control" placeholder="Your Address"></textarea>
                    <br />
                    <input onChange={(e) => this.inputChangeHandler(e)} name="phone" className="form-control" value={this.state.values.phone} placeholder="Your Phone Number" />
                    <br />
                    <select onChange={(e) => this.inputChangeHandler(e)} className="form-control" name="paymentType" value={this.state.values.paymentType}>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button
                        style={{ backgroundColor: "#D70F64" }}
                        className="mr-auto"
                        onClick={this.submitHandler}
                    >
                        Place Order
                    </Button>
                    <Button
                        color="secondary"
                        className="ml-1"
                        onClick={this.goBack}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Checkout);