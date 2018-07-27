// ==UserScript==
// @name          cat detector
// @description   detects famous people throughout history who've owned cats
//                  (based on source code of coincidence detector)
// @include       *
// @grant         GM_getResourceText
// @resource      catlist (.json file is stored on pc)
// @homepageURL   none for now
// @version       0.1
// @namespace     none for now
// @license        WTFPL (Do What the Fuck You Want To Public License)
// ==/UserScript==

//this is still a work in progress famalam
(function(){
var catlist = JSON.parse(GM_getResourceText("catlist"));
var regexp = new RegExp('\\b(' + catlist.join('|') + ')\\b(?!\\)\\))', "gi");

function walk(node) {
	// The creator of coincidence detector stole this function from here:
	// http://is.gd/mwZp7E

	var child, next;

	switch ( node.nodeType )
	{
		case 1:
		case 9:
		case 11:
			child = node.firstChild;
			while ( child )
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3:
			handleText(node);
			break;
	}
}

function handleText(textNode) {
	textNode.nodeValue = textNode.nodeValue.replace(regexp, '（ΦωΦ）$1（ΦωΦ）');
}

walk(document.body);
})();
