class SearchForm{
  constructor(searchFormElement){
    this.searchFormElement = searchFormElement
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchFormElement.addEventListener('submit', this.handleSubmit)
    this.searchKanji = null
    this.disableForm = this.disableForm.bind(this)
  }

  onSubmit(searchKanji){
    this.searchKanji = searchKanji
  }

  disableForm(isDisabled){
    const inputs = this.searchFormElement.querySelectorAll("input")
    for(let i = 0; i < inputs.length; i++){
      inputs[i].disabled = isDisabled
    }
  }



  handleSubmit(event){
    event.preventDefault()
    const formData = new FormData(event.target)
    const searchKey = formData.get("kanji-search").toLowerCase()
    this.searchKanji(searchKey)
    this.searchFormElement.reset()
  }
}
