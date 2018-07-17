import React, { Component } from 'react'
import Note from './Note'

class Board extends Component{
	constructor(props){
		super(props)
		this.state = {
			notes: [
				{
					id: 0,
					note: 'Here we go!'
				},
				{
					id: 1,
					note: 'Perfect!'
				}
			]
		}
		this.eachNote = this.eachNote.bind(this)
		this.update = this.update.bind(this)
		this.remove = this.remove.bind(this)
		this.nextUniqueId = this.nextUniqueId.bind(this)
		this.add = this.add.bind(this)
	}

	update(newNote, i){
		this.setState( prevState => ({
			notes: prevState.notes.map(
					note => (note.id !== i) ? note : {...note, note: newNote}
				)
		}))
	}

	remove(id){
		this.setState( prevState => ({
			notes: prevState.notes.filter(
					note => note.id !== id
				)
		}))
	}

	componentWillMount(){
		var self = this
		if(this.props.count){
			fetch(`https://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`)
				.then(response => response.json())
				.then(json => json[0]
						.split('. ')
						.forEach(sentence => self.add(sentence.substring(0, 25))))
		}
	}

	add(text){
		this.setState(prevState => ({
				notes: [
					...prevState.notes,
					{
						id: this.nextUniqueId(),
						note: text
					}
				]
			}))
	}

	nextUniqueId(){
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++;
	}

	eachNote(note, i){
		return (
				<Note key={i}
				index={i}
				onChange={this.update}
				onRemove={this.remove}>
					{note.note}
				</Note>
			)
	}

	render(){
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
				<button onClick={this.add.bind('null', 'New note')}>New note</button>
			</div>
		)
	}
	
}

export default Board;