import * as slider from "./slider.js"
import * as sidebar from "./sidebar.js"
import * as header from "./header.js"

fetch('https://www.googleapis.com/books/v1/volumes?q="subject:Business"&key=AIzaSyAKonz2kKPQHXtmMwF4OP7K7wCzXCaUgRw&printType=books&startIndex=0&maxResults=20&langRestrict=en')
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err))

// function rating (data) {
// 	const items = data.items
// 	for (let i = 0; i < items.length; i++) {
// 		if (items[i].volumeInfo.hasOwnProperty('averageRating')) {
// 			console.log(items[i]);
// 		}
// 	}
// }

