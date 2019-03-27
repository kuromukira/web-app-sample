import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class DialogPromptComponent extends React.Component {

    btnCloseDialog_Clicked = () => this.props.dialogClose();

    btnConfirm_Clicked = () => this.props.targetMethod();

    render() {
        return (
            <Modal size="sm" centered show={this.props.dialogShow}>
                <Modal.Header>
                    <Modal.Title>Confirm</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex">
                    <span>{this.props.dialogMsg}</span>
                    {this.props.error && <div className="flex-fill alert alert-danger" role="alert">{this.props.error.message}</div>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" size="sm" onClick={this.btnCloseDialog_Clicked}>No</Button>
                    <Button variant="primary" size="sm" onClick={this.btnConfirm_Clicked}>Yes</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default DialogPromptComponent;