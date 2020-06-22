class SearchForm{
  constructor(searchFormElement){
    this.searchFormElement = searchFormElement
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchFormElement.addEventListener('submit', this.handleSubmit)
    this.searchKanji = null
  }

  handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchKey = formData.get("kanji-search")
    console.log(searchKey)
    this.searchFormElement.reset()
  }
}
