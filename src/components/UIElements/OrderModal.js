import { Modal } from "antd";
import React from "react";

const OrderModal = ({ session, orderedBy, showModal, setShowModal }) => {
  return (
    <Modal
      visible={showModal}
      title="Order info"
      onCancel={() => setShowModal(!showModal)}
    >
      <p>Payment ID : {session.payment_intent}</p>
      <p>Payment status : {session.payment_status}</p>
      <p>
        Amount : {session.currency.toUpperCase()}
        {session.amount_total / 100}
      </p>
      <p>Booked by : {orderedBy.name}</p>
    </Modal>
  );
};

export default OrderModal;
