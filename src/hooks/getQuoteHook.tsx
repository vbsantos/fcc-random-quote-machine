import { useLayoutEffect, useState } from 'react'

interface Quote {
  content: String
  author: String
}

const getQuoteHook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<String>('')
  const [quote, setQuote] = useState<String>('')
  const [author, setAuthor] = useState<String>('')


  const fetchQuote = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('https://api.quotable.io/random')
      const data: Quote = await response.json()

      setQuote(data.content)
      setAuthor(data.author)
      setError('')
    } catch (err) {
      setError(`${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  useLayoutEffect(() => {
    fetchQuote()
  }, [])

  const rerun = () => fetchQuote()

  return { quote, author, isLoading, error, rerun }
}

export default getQuoteHook
