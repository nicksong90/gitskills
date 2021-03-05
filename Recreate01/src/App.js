import React from 'react';
import './App.css';

class App extends React.Component {

  state = {
    data: [
      { id: 1, content: 'name1', complete: false, },
      { id: 2, content: 'name2', complete: false, },
      { id: 3, content: 'name3', complete: true, },
    ],
    task: ''
  }

  handleClick = (id) => {
    let newData = this.state.data.map((v) => {
      if (v.id === id) {
        v.complete = !v.complete
        return v
      }
      return v
    })
    this.setState({
      data: newData
    })
  }

  handleDelete = (e, id) => {
    e.stopPropagation();
    let newData = this.state.data.filter((v) => v.id !== id)
    this.setState({
      data: newData
    })
  }

  handleChange = (e) => {
    this.setState({
      task: e.target.value
    })
  }

  handleAdd = () => {
    let newData = this.state.data;
    if (!this.state.task) {
        alert('Please input')
        return
    }
    newData.push({ id: Date.now(), content: this.state.task, complete: false })
    this.setState({
      data: newData,
      task: ''
    })
  }
  render() {
    let num = this.state.data.length;
    let confirm = this.state.data.filter((v) => v.complete === true).length;
    return (
      <div className="App">
        <h1 style={{ textAlign: 'center' }}>Add Name And States</h1>
        <div className="list">
          {
            this.state.data.map((value) => {
              return (<div
                key={value.id}
                className={value.complete ? 'click' : 'unClick'}
                onClick={() => this.handleClick(value.id)}
              >{value.content}
                <span
                  style={{ float: 'right', color: 'gray', fontSize: '10px' }}
                  onClick={(e) => this.handleDelete(e, value.id)}
                >delete</span>
              </div>)
            })
          }
          <div className='num'>{confirm}Finished/{num}Total</div>
        </div>
        <div style={{ height: '36px', lineHeight: '36px' ,marginBottom:'20px'}}>
          <span style={{ fontWeight: 700 }}><h3>Show Results</h3></span>
          <input
            name='task'
            className='enter'
            placeholder="Add Name and States"
            value={this.state.task}
            onChange={(e) => this.handleChange(e)} />
        </div>
        <button className='save' onClick={this.handleAdd}>Submit</button>
      </div>
    );
  }
}

export default App;
