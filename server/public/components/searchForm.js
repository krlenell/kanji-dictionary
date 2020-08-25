class SearchForm{
  constructor(searchFormElement){
    this.searchFormElement = searchFormElement
    this.searchFormInput = this.searchFormElement.querySelector("#form-input")
    this.searchFormButton = this.searchFormElement.querySelector("#form-button")
    this.disableForm = this.disableForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.searchFormElement.addEventListener('submit', this.handleSubmit)
    this.searchKanji = null
    this.handleChange = this.handleChange.bind(this)
    this.searchFormInput.oninput = this.handleChange
    this.disableForm = this.disableForm.bind(this)
  }

  onSubmit(searchKanji){
    this.searchKanji = searchKanji
  }

  handleChange(e){
    console.log("change was done", e.target.value.length)
    console.log("searchFormButton", this.searchFormButton)
    if(e.target.value.length){
      this.searchFormButton.removeAttribute("disabled")
      this.searchFormButton.classList.remove("disabled")
    } else {
      this.searchFormButton.setAttribute("disabled", "disabled")
      this.searchFormButton.classList.add("disabled")
    }
  }

  disableButton(){
    if(!this.searchFormButton.hasAttribute("disabled")){
      this.searchFormButton.setAttribute("disabled", "disabled")
    }
    if(!this.searchFormButton.classList.contains("disabled")){
      this.searchFormButton.classList.add("disabled")
    }
  }

  disableForm(isDisabled){
    const inputs = this.searchFormElement.querySelectorAll("input")
    console.log(inputs)
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
