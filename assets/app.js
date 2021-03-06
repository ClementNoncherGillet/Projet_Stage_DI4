/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

 
 import Items from './Components/Items';
 

     componentDidMount() {
         fetch('https://jsonplaceholder.typicode.com/posts/')
             .then(response => response.json())
             .then(entries => {
                 this.setState({
                     entries
                 });
             });
     }
 
     render() {
         return (
             <div className="row">
                 {this.state.entries.map(
                     ({ id, title, body }) => (
                         <Items
                             key={id}
                             title={title}
                             body={body}
                         >
                         </Items>
                     )
                 )}
             </div>
         );
     }
 }
 

 //Pour éviter l'erreur $ is not defined etc..
import './styles/app.scss';
 
import './bootstrap';
 
const $ = require('jquery');
