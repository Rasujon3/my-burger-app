import React, { Component } from "react";
import { Button, Modal, ModalBody, Spinner } from "reactstrap";

import axios from "axios";

import { connect } from 'react-redux';
import { resetIngredients } from '../../../redux/actionCreators'

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        userId: state.userId,
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout extends Component {
    state = {
        values: {
            delivaryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
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
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
            userId: this.props.userId,
        }
        axios.post("https://burger-builder-8ec9b-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json?auth=" + this.props.token, order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Order Placed Successfully",
                    })
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Order Again!",
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went Wrong! Order Again!",
                })
            })
    }
    render() {
        let form = (
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
                        disabled={!this.props.purchasable}
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
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen} onClick={this.goBack} >
                    <ModalBody>
                        <p>{this.state.modalMsg}</p>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);