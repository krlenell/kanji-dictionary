class SearchForm{
  constructor(searchFormElement){
    this.searchFormElement = searchFormElement
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchFormElement.addEventListener('submit', this.handleSubmit)
    this.searchKanji = null
  }

  onSubmit(searchKanji){
    this.searchKanji = searchKanji
  }

  handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchKey = formData.get("kanji-search").toLowerCase()
    console.log(searchKey)
    this.searchKanji(searchKey)
    this.searchFormElement.reset()
  }
}
