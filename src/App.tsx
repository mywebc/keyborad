import React, { Component } from 'react'
import './App.scss'
import 'akeyboard/css/index.css'
import $ from 'jquery'
import MobileKeyboard from './keyboard/keyboard'

// import MobileKeyboard from './Keyboard/keyboard.js'

interface appState {
	isShowKeyBoard: boolean
}


export default class App extends Component<{}, appState> {

	constructor(props: {}) {
		super(props)
		this.state = {
			isShowKeyBoard: false
		}
	}


	componentDidMount() {
		// this.initKeyBoard()
	}


	private clickKey = () => {
		this.setState({ isShowKeyBoard: true })
	}

	//输入框获取光标
	private getPosition = (element: HTMLInputElement) => {
		let cursorPos = 0;
		if ((document as any).selection) {//IE
			var selectRange = (document as any).selection.createRange();
			selectRange.moveStart('character', -element.value.length);
			cursorPos = selectRange.text.length;
		} else if (element.selectionStart || element.selectionStart == 0) {
			cursorPos = element.selectionStart;
		}
		return cursorPos;
	}


	private handleGetFocus = () => {
		this.setState({ isShowKeyBoard: true }, () => {
			this.initKeyBoard()
			$("#fakeInput").blur()
		})
	}

	private handleBlur = () => {
		// this.setState({ isShowKeyBoard: false })
	}

	private handleClickDiv = () => {
		if (!this.state.isShowKeyBoard) {
			this.setState({ isShowKeyBoard: true })
		}
	}

	private initKeyBoard = () => {
		// 渲染手机键盘
		const myKey = new MobileKeyboard({
			el: '#main',
			style: {},
			fixedBottomCenter: true
		})
		myKey.inputOn("#fakeInput", "value");
	}

	render() {
		return (
			<div className="wrapper">

				{/* <div id="fakeInput" contentEditable={false} onClick={this.handleClickDiv}></div> */}
				<input type="text" id="fakeInput" onFocus={this.handleGetFocus} onBlur={this.handleBlur} readOnly />
			
				{this.state.isShowKeyBoard && <div id="main" onClick={this.clickKey}></div>}
			</div>
		)
	}
}
