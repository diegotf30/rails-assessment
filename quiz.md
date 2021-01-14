#### 1. Write a function that returns product of all numbers of an array/range

```ruby
# O(n) time
# O(1) space
def product(li)
  li.reduce { |prod, elem| prod * elem }
end

puts product([1, 4, 21]) # 84
puts product([-4, 2.3e12, 77.23, 982, 0b101]) # -3.48863356e+18
puts product([-3, 11, 2]) # -66
puts product([8, 300]) # 2400
puts product([234, 121, 23, 945, 0]) # 0
puts product(1..5) # 120
```

#### 2. Compare if two strings are anagrams (assume input consists of ASCII alphabets only)

```ruby
# O(n) time
# O(n) space
def str_anagram(l, r)
  return false unless l.length == r.length

  l_map = Hash.new(0) # set default value as 0
  l.downcase.each_char { |letter| l_map[letter] += 1 }
  r_map = Hash.new(0)
  r.downcase.each_char { |letter| r_map[letter] += 1 }

  l_map == r_map
end

puts str_anagram('Tap', 'paT') # true
puts str_anagram('beat', 'table') # false
puts str_anagram('beat', 'abet') # true
puts str_anagram('seat', 'teal') # false
puts str_anagram('god', 'Dog') # true
```

#### 3. Compare if two strings are same irrespective of case

```ruby
# O(n) time
# O(1) space (couldn't find downcase implementation, so it might use unaccounted auxiliary space)
def str_cmp(l, r)
  return false unless l.length == r.length

  l.downcase == r.downcase
end

puts str_cmp('nice', 'nice')
puts str_cmp('how', 'who')
puts str_cmp('GoOd DaY', 'gOOd dAy')
puts str_cmp('foo', 'food')
```

#### 4. Write a function that sorts the keys in a hash by the length of the key as a string. For instance, the hash:

```ruby
# O(nlogn) time
# O(1) space
def extract_keys_and_sort(hash)
  keys = hash.keys.map { |elem| elem.to_s }
  keys.sort_by { |k| k.length }
end

puts extract_keys_and_sort({ abc: 'hello', another_key: 123, 4567 => 'third' }) # ["abc", "4567", "another_key"]
```

#### 5. Explain the difference between calling `super` and `super()` methods (OOP)

The nit is in how you want to call the inherited method, if `super` is called without parenthesis, then the arguments for the child method will be passed to the inherited method. But if you call `super()`, then the inherited method will be called without any arguments being passed.

And, here's a simple example:

```ruby
class Person
  def talk # no arguments!
    puts "I'm a person!"
  end

  def shout(name)
    puts "I'M #{name.upcase}!!!!"
  end
end

class Diego < Person
  def talk(arg1)
    super() # Pass no arguments to parent talk
  end

  def shout(name)
    super # pass name to parent shout
  end
end

d = Diego.new
d.talk('123') # argument is unused, prints 'I'm a person'
d.talk('diego') # prints 'I'M DIEGO!!!!'
```


