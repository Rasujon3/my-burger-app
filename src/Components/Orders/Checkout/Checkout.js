import React, { Component } from "react";
import { Button } from "reactstrap";

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
        console.log(this.state.values);
    }
    render() {
        return (
            <div>
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

export default Checkout;