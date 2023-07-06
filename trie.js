class TrieNode {
    constructor() {
        this.children = {}
        this.isEndOfWord = false
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode()
    }
    insert(word) {
        let current = this.root
        for (let i = 0; i < word.length; i++) {
            const c = word[i]
            if (!current.children[c]) {
                current.children[c] = new TrieNode()
            }
            current = current.children[c]
        }
        current.isEndOfWord = true
    }
    search(word) {
        let current = this.root
        for (let i = 0; i < word.length; i++) {
            const c = word[i]
            if (!current.children[c]) {
                return false;
            }
            current = current.children[c]
        }
        return current.isEndOfWord
    }
    startWith(prefix) {
        let current = this.root
        for (let i = 0; i < prefix.length; i++) {
            const c = prefix[i]
            if (!current.children[c]) {
                return false
            }
            current = current.children[c]
        }
        return true
    }
    suggestions(prefix) {
        let node = this.root
        let suggestions = []
        for (let i = 0; i < prefix.length; i++) {
            let c = prefix[i]
            if (!node.children[c]) {
                return suggestions
            }
            node = node.children[c]
        }
        this._dfs(node, prefix, suggestions)
        return suggestions
    }
    _dfs(node, prefix, suggestions) {
        if (node.isEndOfWord) suggestions.push(prefix)
        for (let key in node.children) {
            this._dfs(node.children[key], prefix + key, suggestions)
        }

    }
}

let t = new Trie()
t.insert("apple")
t.insert("api")
t.insert("ate")
t.insert("adam")
t.insert("kind")
console.log(t.search("api"));
console.log(t.suggestions("a"));