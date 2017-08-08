import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchPage from './SearchPage'
import MyReads from './MyReads'
import { Route } from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAll()
  }

  getAll = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeBookShelf = (book, shelf) => {
    this.setState((prevState) => {
      let books = prevState.books.filter((b) => !(b.id === book.id))
      if (shelf !== 'none') {
        books.push({...book, shelf: shelf})
      }
      return {books: books}
    });
    BooksAPI.update(book, shelf).catch((reason) => {
      this.getAll()
    });
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
            <MyReads books={books} onChangeBookShelf={this.changeBookShelf}/>
        )}/>
        <Route path='/search' render={({ history }) => (
            <SearchPage
              myBooks={books}
              onChangeBookShelf={this.changeBookShelf}
            />
        )}/>
      </div>
    )
  }
}

export default BooksApp
