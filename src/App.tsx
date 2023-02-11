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

const TweetQuote = ({ onClick, disabled }: { onClick: MouseEventHandler<HTMLButtonElement>, disabled: boolean }) => {
  return (
    <button id="tweet-quote" onClick={onClick} disabled={disabled}>Tweet</button>
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

  const tweetQuoteOnNewTab = (quote: String) => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote}" - ${author}`)}`
    window.open(tweetUrl, '_blank')
  }

  if (error) {
    return <div id="error">{error}</div>
  }

  return (
    <div id="app-container">
      <QuoteBox>
        <Text text={quote} />
        <Author author={author} />
        <NewQuote disabled={isLoading} onClick={rerun} />
        <TweetQuote disabled={isLoading} onClick={() => tweetQuoteOnNewTab(quote)} />
      </QuoteBox>
    </div>
  )
}
