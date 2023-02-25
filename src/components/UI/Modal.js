import { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const BackDrop = (props) => {
	return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
}
const ModalOverlay = (props) => {
	return (
		<div className={classes.modal}>
			<div className={classes.content}>{props.children}</div>
		</div>
	)
}

const Modal = (props) => {
	const portalElement = document.getElementById('overlays')

	return (
		<Fragment>
			{ReactDOM.createPortal(<BackDrop onCloseCart={props.onCloseCart} />, portalElement)}
			{ReactDOM.createPortal(
				<ModalOverlay>{props.children}</ModalOverlay>,
				portalElement
			)}
		</Fragment>
	)
}

export default Modal
