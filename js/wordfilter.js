function WordFilter() {
    let _tree = {}

    let _maskWord = '*'

    function _word2Tree(root, word) {
    	if (word.length == 0) {
            return
        }

    	function _byte2Tree(r, ch, tail) {
    		if (tail) {
                if (typeof(r[ch]) == 'object') {
                    r[ch].isTail = true
                } else {
                    r[ch] = true
                }
    		} else {
                if (r[ch] == true) {
                    r[ch] = { isTail: true }
                } else {
    			    r[ch] = r[ch] || {}
                }
    		}
    		return r[ch]
    	}
    	
    	let tmpparent = root
    	let len = word.length
        for (let i=0; i<len; i++) {
        	tmpparent = _byte2Tree(tmpparent, word.substring(i, i+1), i==len-1)
        }
    }

    function _check(parent, word, idx) {
        let len = word.length
        
    	let ch = word.substring(0, 1)
    	let child = parent[ch]

        if (!child) {
            
        } else if (typeof(child) == 'object') {
            if (len > 1) {
                if (child.isTail) {
    	            return _check(child, word.substring(1), idx+1) || idx+1
                } else {
                    return _check(child, word.substring(1), idx+1)
                }
            } else if (len == 1) {
                if (child.isTail == true) {
                    return idx+1
                }
            }
        } else if (child == true) {
        	return idx+1
        }
        return false
    }

    this.addWord = function(word) {
        _word2Tree(_tree, word)
    }

    this.addWords = function(words) {
        if (typeof(words) == 'object' && !!words.length) {
        	for (let i=0; i<words.length; i++) {
        		_word2Tree(_tree, words[i])
        	}
        }
    }

    this.maskString = function(s) {
        /*if (typeof(s) != 'string') {
            return ""
        }*/

        let i = 0
        let len = s.length
    	let word, idx, tmps

    	while (i < len) {
        	word = s.substring(i)
            //console.log(`--- 111:  i: ${i}, idx: ${idx}, tmps: ${tmps}, word: ${word} s: `, s.substring(idx));
        	idx = _check(_tree, word, i)
            
            //console.log(`--- 222:  i: ${i}, idx: ${idx}, tmps: ${tmps}, word: ${word} s: `, s.substring(idx));

        	if (idx && idx > 0) {
        		tmps = s.substring(0, i)
                
        		for (let j=0; j<idx-i; j++) {
        			tmps = tmps + _maskWord
        		}
                s = tmps + s.substring(idx)
                //console.log(`--- 333:  i: ${i}, idx: ${idx}, tmps: ${tmps}, word: ${word} s: `, s.substring(idx));
        		i = idx
        	} else {
        		i = i + 1
        	}
        }
        return s
    }
}

function testWordFilter() {
    let filter = new WordFilter()

    let dirtywords = ["abc", "abcde"]
    filter.addWord("tmd")
    filter.addWord("xxx")
    filter.addWords(dirtywords)
    let s = "abcyyabcdefghixxxzzztmdyyyxxx"
    let ret = filter.maskString(s)
    let loop = 10000
    let t1 = (new Date()).getTime()/1000
    for (let i=1; i<loop; i++) {
        ret = filter.maskString(s)
    }
    let t2 = (new Date()).getTime()/1000

    console.log(`${loop} times maskString(${s} -> ${ret}), time used: ${t2-t1} seconds\n`)
}

