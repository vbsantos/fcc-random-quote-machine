import { MouseEventHandler, ReactNode } from 'react'
import getQuoteHook from './hooks/getQuoteHook'
import './style.css'

const QuoteBox = ({ children }: { children: ReactNode }) => {
  return (
    <div id="quote-box">{children}</div>
  )
}

const Text = ({ text }: { text: String }) => {
  return (
    <p id="text">“{text}”</p>
  )
}

const Author = ({ author }: { author: String }) => {
  return (
    <p id="author">{author}</p>
  )
}

const NewQuote = ({ onClick, disabled }: { onClick: MouseEventHandler<HTMLButtonElement>, disabled: boolean }) => {
  return (
    <button id="new-quote" onClick={onClick} disabled={disabled}>Next</button>
  )
}

const TweetQuote = ({ quote, author }: { quote: String, author: String }) => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`
  return (
    <a id="tweet-quote" href={tweetUrl} target="_blank">Tweet</a>
  )
}

export const App = () => {
  const { quote, author, isLoading, error, rerun }: {
    quote: String,
    author: String,
    isLoading: boolean,
    error: String,
    rerun: MouseEventHandler<HTMLButtonElement>
  } = getQuoteHook()

  if (error) {
    const errorMessage = "Oops, looks like the quote machine is taking a break. Don't worry, it's not personal. Maybe it's off finding some inspiration, or perhaps it just needs a good cup of coffee. Hang in there, it'll be back with more inspiring quotes before you know it!"
    return <div id="error">{errorMessage}</div>
  }

  return (
    <div id="app-container">
      <QuoteBox>
        <Text text={quote || "..."} />
        <Author author={author || "..."} />
        <NewQuote disabled={isLoading} onClick={rerun} />
        <TweetQuote quote={quote} author={author} />
      </QuoteBox>
    </div>
  )
}
