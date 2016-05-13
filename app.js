var Header = React.createClass({
  render: function(){
    return(
    <header>
       <a href='http://www.freecodecamp.com'>
        <img className='logo' src='https://s3.amazonaws.com/freecodecamp/freecodecamp_logo.svg'/>
       </a>
    </header>
    );
  }
});
//=========================================================================================
var AddEntry= React.createClass({
  addEntry:function(){
    $("<input type='text' class='form-control input-md' placeholder='More Ingredients'></input>").appendTo('#form');
  },
  submited: function(){
    {this.props.add}
    {this.props.toggleCancel}
  },
  render: function(){
    return(
      <div id="entry" className='collapse'>
    <form id='form' action='#'>
        <input type='text' className='form-control input-md'placeholder='Name of cuisine'></input>
        <br />
        <br/>
        <input type='text' className='form-control input-md'placeholder='Ingredient 1'></input>
        <input type='text' className='form-control input-md'className='form-control input-md'placeholder='Ingredient 2'></input>
        <input type='text' className='form-control input-md'placeholder='Ingredient 3'></input>
        <input type='text' className='form-control input-md'placeholder='Ingredient 4'></input>
        <input type='text' className='form-control input-md'placeholder='Ingredient 5'></input>
    </form>
      <br/>
      <button onClick={this.addEntry} className='glyphicon glyphicon-plus'></button>
        <br/><br/>
      <button onClick={this.props.add} data-toggle='collapse' href='#entry'>Add Recipe</button>
    </div>
    );
  }
});
var Change = React.createClass({
  //name={res[0]} ingredients={res[1]}
  render: function(){
    return(
    <div>
    <EditModal name={this.props.name} ingredients={this.props.ingredients} edit={this.props.edit} index={this.props.index}/>
    <button data-toggle='modal' data-target={'#editPanel'+this.props.index} className='glyphicon glyphicon-edit'></button>
    <button onClick={this.props.delete} value={this.props.name} className='glyphicon glyphicon-trash'></button>
    </div>
    );
  }
});
var Box = React.createClass({
  //add new recipie button change
  add2cancel: function(){
    //console.log('add2cancel ran');
    //console.log(document.getElementById('add').innerHTML);
    if(document.getElementById('add').innerHTML=='Add New Recipe'){
      document.getElementById('add').innerHTML='Cancel';
    }else{
      document.getElementById('add').innerHTML='Add New Recipe';
    }
  },
  render: function(){
    return (
    <div className='well'>
        <h3>Recipe Box</h3>
        <br/>
        {this.props.list.map(function(res, ind){
          //console.log(res)
;          var list= res[1].split(',');
          return(
          <div>
          <p className='foodTitle btn-success' data-toggle='collapse' href={'#ingred'+ind} key={ind}>{res[0]}</p>
              <div id={'ingred'+ind} className='collapse'>
           <ul >
             {res[1].split(',').map(function(entry,index){
                //console.log(entry);
                return(
                <li key={index}>{entry}</li>
                );
              })}
             </ul>
             <Change index={ind} name={res[0]} ingredients={res[1]} delete={this.props.delete} edit={this.props.edit}/>
             <br/>
             </div>
          </div>
          );
        }.bind(this))}
        <br/>
        <AddEntry add={this.props.add} toggleCancel={this.add2cancel}/>
        <div className='btn-danger'id='add' onClick={this.add2cancel} data-toggle='collapse' href='#entry'>Add New Recipe</div>
    </div>
    );
  }
});
var EditModal= React.createClass({
  addEntry:function(){
    $("<input class='form-control input-md'></input>").appendTo('#newItem');
  },
  render: function(){
    //console.log(this.props.ingredients);
    return (
    <div  id={'editPanel'+this.props.index} className='modal fade'>
          <div className='modal-dialog modal-content'>
            <div className='modal-header'>
              Recipe edit
              <hr></hr>
            <form className='editForm' id={this.props.name}>
            Recipe Name : <input value={this.props.name}></input>
            <br />
              <br/>
              {this.props.ingredients.split(',').map(function(res,ind){
                return(
                <input key={ind} defaultValue={res} className='form-control input-md'></input>
                  );
              })}
              <div id='newItem'></div>
            </form>
              <br/>
              <button onClick={this.addEntry} className='glyphicon glyphicon-plus'></button>
              <br/><br/>
              <button data-toggle='modal' data-target={'#editPanel'+this.props.index} onClick={this.props.edit} value={this.props.name} className='btn'>Save</button>
              <button data-toggle='modal' data-target={'#editPanel'+this.props.index} className='btn btn-info'>Cancel</button>
            </div>
          </div>
        </div>
    );
  }
});
var RecipeBox = React.createClass({
  getInitialState: function(){
    return({
      list: []
    });
  },
  componentWillMount: function(){
    //test if web storage is available
    if(typeof(Storage) !== "undefined") {
      //sessionStorage.clear();
      if(sessionStorage.length===0){
        var recipeList=[
          ["Pumpkin Pie",'Pumpkin Puree,Sweetened Condensed Milk,Eggs,Pumpkin Pie Spice,Pie Crust'],
          ["Spaghetti",'Noodles,Tomato Sauce,(Optional) Meatballs'],
          ["Onion Pie",'Onion,Pie Crust,Sounds Yummy right?']];
        sessionStorage.setItem('recipeList',JSON.stringify(recipeList));
      }
      var jsonList= JSON.parse(sessionStorage.getItem('recipeList'));
        //console.log(jsonList);
      this.setState({
          list: jsonList
        });
    // Code for localStorage/sessionStorage.
      //window.alert('Web storage available!');
    } else {
    // Alert! No Web Storage support..
      window.alert('No Web Storage support! App will not store any changes.');
    }
  },
  addItem:function(){
    //console.log('addItem triggered');
    //console.log(document.getElementById("form").elements.length);
    //console.log(document.getElementById("form").elements[0].value);
    var newRecipeEntry=[document.getElementById("form").elements[0].value];
    document.getElementById('form').elements[0].value='';
    var ingredientList='';
    for(var i=1; i<document.getElementById('form').elements.length;i++){
      if(document.getElementById('form').elements[i].value!==""){
        if(ingredientList==''){
         ingredientList+=document.getElementById('form').elements[i].value;
        }else{
        ingredientList+=","+document.getElementById('form').elements[i].value;
        }
        document.getElementById('form').elements[i].value='';
      }
    }//for loop
    newRecipeEntry.push(ingredientList);
    //console.log(newRecipeEntry);
    var newList=this.state.list;
    newList.push(newRecipeEntry);
    this.update(newList);
    //collapse add item interface
    if(document.getElementById('add').innerHTML=='Add New Recipe'){
      document.getElementById('add').innerHTML='Cancel';
    }else{
      document.getElementById('add').innerHTML='Add New Recipe';
    }
  },
  update: function(newArray){
    this.setState({
          list: newArray
        });
        sessionStorage.setItem('recipeList',JSON.stringify(newArray));
  },
  deleteItem: function(e){
    console.log('deleteItem triggered ');
    this.state.list.map(function(res,ind){
      if(e.target.value==res[0]){
        var newList=this.state.list;
        newList.splice(ind,1);
        this.update(newList);
      }
    }.bind(this));
  },
  editItem: function(e){
    console.log('editItem triggered ');
    //console.log(document.getElementById(e.target.value));
    var newFood=[document.getElementById(e.target.value).elements[0].value];
    var ingreList='';
    for(var i=1;i<document.getElementById(e.target.value).length;i++){
      //console.log(document.getElementById(e.target.value).elements[i].value);
      if(document.getElementById(e.target.value).elements[i].value!==""){
        if(ingreList==''){
         ingreList+=document.getElementById(e.target.value).elements[i].value;
        }else{
        ingreList+=","+document.getElementById(e.target.value).elements[i].value;
        }
      }
    }
    //console.log(ingreList);
    newFood.push(ingreList);
    //console.log("newFood "+newFood);
    this.state.list.map(function(res,ind){
      if(e.target.value==res[0]){
        var newList=this.state.list;
        newList.splice(ind,1,newFood);
        this.update(newList);
      }
    }.bind(this));
  },
  render: function(){
    console.log(this.state);
    return(
      <div>
        <Header />
        <Box list={this.state.list} edit={this.editItem} delete={this.deleteItem} add={this.addItem}/>
      </div>
    );

  }
});
React.render(<RecipeBox />, document.getElementById('container'));
