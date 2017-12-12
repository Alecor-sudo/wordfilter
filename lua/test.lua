local filter = require("wordfilter")

local dirtywords =
{
	"abc",
	"abcde",
}
filter:addWord("xxx")
filter:addWord("tmd")
filter:addWords(dirtywords)
local s = "abcyyabcdefghixxxzzzxxxyyytmd"
local ret = ''
local loop = 10000
local t1 = os.clock()
for i=1,loop do
	ret = filter:maskString(s)
end
local t2 = os.clock()

print(string.format("%d times call maskString(\"%s\" -> \"%s\"), time used: (%f)\n", loop, s, ret, t2-t1))