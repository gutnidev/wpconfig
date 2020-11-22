import Post from './models/post.js';
import './styles/style.css';
import json from './assets/json.json';
import webpackLogo from './assets/webpack-logo.png';
import xml from './assets/data.xml';
import csv from '@/assets/data.csv';
import * as $ from 'jquery';
import './styles/bodyColor.scss';
import './forBabel.js';

const post = new Post(null, webpackLogo);

console.log(post.toString());
console.log(post.uppercaseTitle);
console.log('JSON:', json);
console.log('XML:', xml);
console.log('CSV:', csv);
console.log('*************');

$('.jsonValue').text(post.toString());
async function foo() {
    const csv = await import('@/assets/data.csv');
    console.log('CSV:', csv.default);
    document.querySelector('#testLazy').removeEventListener('click', foo);
}
document.querySelector('#testLazy').addEventListener('click', foo);