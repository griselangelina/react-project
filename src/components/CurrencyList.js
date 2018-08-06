import React, {Component} from 'react';
import axios from 'axios';
import Currency from './Currency';


class CurrencyList extends Component{
	constructor(props) {
    super(props);

    this.state = {
      currdata: [],
	  newCurr :'',
	  currValue:'1',
	  hideForm:true,
	}
	    this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeValue = this.handleChangeValue.bind(this);
		this.handleSubmitValue = this.handleSubmitValue.bind(this);
		this.AddMoreCurr=this.AddMoreCurr.bind(this);
}
  componentDidMount() {
    axios.get('https://exchangeratesapi.io/api/latest?base=USD&symbols='+this.props.symbol)
      .then(res => {
		 const currency = res.data.rates;
		 const currdata =currency;
		
		  this.setState({currdata});


      })
  }

  
  handleRowDel(symbol) {
    var index = this.props.symbol.indexOf(symbol.tes);
	var currencySize=this.props.symbol.length;
    this.props.symbol.splice(index, 1);
	var currdata=this.state.currdata;
	 delete currdata[symbol.tes];
	 this.setState({currdata});

  };
  
   handleChange(event) {
    this.setState({newCurr: event.target.value});

  }
   handleSubmit(event) {
	alert(this.state.newCurr);
	this.props.symbol.push(this.state.newCurr);
    axios.get('https://exchangeratesapi.io/api/latest?base=USD&symbols='+this.props.symbol)
      .then(res => {
		 const currency = res.data.rates;
		 const currdata =currency;
		
		  this.setState({currdata});
		this.setState({hideForm:true});


      })
    event.preventDefault();
  }
  
   handleChangeValue(event) {
    this.setState({currValue: event.target.value});
	    event.preventDefault();


  }
   handleSubmitValue(event) {
	var valueInput=this.state.currValue;
   this.setState({currValue: valueInput});
	 event.preventDefault();

  }
  AddMoreCurr(){
	  this.setState({hideForm:false});
  }
  
 render(){
    var rowDel = this.props.onRowDel;

	return (
		<div class=''>
	
		 <form onSubmit={this.handleSubmitValue}>
			<div class="container header">
			<div class='row col-lg-12 col-md-12'> 
				<p>United States Dollar</p>
			</div>
			<div class='row col-lg-12 col-md-12'> 
						<div class='col-lg-6 col-md-6'>  
							<h5 class="currText">USD</h5>
						</div>
						<div class='col-lg-6 col-md-6'>  
							<input type="text" value={this.state.currValue} onChange={this.handleChangeValue} />				

						</div>
			</div>
			</div>
		</form>
			
		 { this.props.symbol.map(sym => 
			 <Currency
              tes={sym}
			  currValue={this.state.currValue}
              currdata={this.state.currdata[sym]} onDelEvent={this.handleRowDel.bind(this)}/>
			
		 )}
		
		<div class="container ">
		  <div class='row bg-light newCurr col-md-12 col-lg-12 mb-5 mb-lg-0 mb-lg-3 '>

			  <a href="#" onClick={this.AddMoreCurr} style={{display: this.state.hideForm ? 'block' : 'none' }}>(+) Add More Currencies</a>
			  <div id="hideForm" style={{display: this.state.hideForm ? 'none' : 'block' }}>
			   <form onSubmit={this.handleSubmit} >
					<label>
						<input type="text" value={this.state.newCurr} onChange={this.handleChange} />				
					</label>
					<input type="submit" value="Submit" />
				</form> 
				</div>
			</div>
			</div>
		</div>
	)
 } 
}
export default CurrencyList;