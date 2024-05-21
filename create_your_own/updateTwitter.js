function updateTwitter() {
	document.getElementsByClassName("twitter-share-button")[0].outerHTML = "<iframe id=\"twitter-widget-0\" scrolling=\"no\" allowtransparency=\"true\" class=\"twitter-share-button twitter-share-button-rendered twitter-tweet-button\" style=\"position: static; visibility: visible; width: 61px; height: 20px;\" title=\"Twitter Tweet Button\" src=\"https://platform.twitter.com/widgets/tweet_button.d6364fae9340b0be5f13818370141fd0.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;original_referer="+encodeURI(window.location.href)+"&amp;size=m&amp;text=Check this out. I made this using @deviparikh's algorithmic art tool. It's a lot of fun, you should try it out! #generative #generativeart #creativecoding #codeart #algorithmicart pic.twitter.com/hV2ps5StmB &amp;time=1569167647479&amp;type=share&amp;url="+encodeURI(window.location.href)+"\" frameborder=\"0\"></iframe>";
	var name = encodeURI(window.location.href);
	name = name.split([]);
	var n = name.indexOf("?");
	name.splice(0,n);
	name.splice(0,1);
	name = name.join([]);
	name = name.replace(/=/gi, "e_");
	name = name.replace(/&/gi, "n_");
	name = name.replace(/\./gi, "d_");
	name = name + '.png';
	//console.log(name);
	//name = name.replace('.png',[]);
	//name = name.replace(/e_/gi, "=");
	//name = name.replace(/n_/gi, "&");
	//name = name.replace(/d_/gi, ".");
	//console.log(name);
	document.getElementById("download").download = name;
}