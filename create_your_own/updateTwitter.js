function getCyoShareText() {
	var title = document.querySelector("h1");
	var medium = title ? title.textContent.trim() : "art";
	return "I made this with @deviparikh's " + medium + " tool — try making one yourself";
}

function postOnX(customText) {
	var text = customText || getCyoShareText();
	var url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(text) + "&url=" + encodeURIComponent(window.location.href);
	window.open(url, "_blank");
}

function buildDownloadName() {
	var query = window.location.search.replace(/^\?/, "");
	if (!query) return "myart.png";
	query = encodeURI(query);
	query = query.replace(/=/gi, "e_");
	query = query.replace(/&/gi, "n_");
	query = query.replace(/\./gi, "d_");
	return query + ".png";
}

function updateTwitter() {
	var download = document.getElementById("download");
	if (download) {
		download.download = buildDownloadName();
	}
}
