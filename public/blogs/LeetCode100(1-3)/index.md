# hot1-两数之和

**总结：利用哈希值**

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出 **和为目标值** *`target`* 的那 **两个** 整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

```tex
示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：
输入：nums = [3,2,4], target = 6
输出：[1,2]

示例 3：
输入：nums = [3,3], target = 6
输出：[0,1]
```

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        rec = {}

        for i in range(len(nums)):
            if nums[i] in rec:
                return [i, rec[nums[i]]]
            ans = target - nums[i]
            rec[ans] = i
```

# hot2-字母异位词分组

**总结：利用对字符串字母进行排序找到相同值**

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

```
示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：
输入：nums = [3,2,4], target = 6
输出：[1,2]

示例 3：
输入：nums = [3,3], target = 6
输出：[0,1]
```

```python
class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        str_dict = {}

        for s in strs:
            sorted_s = ''.join(sorted(s))

            if sorted_s not in str_dict:
                str_dict[sorted_s] = []

            str_dict[sorted_s].append(s)
        return list(str_dict.values())	# 字典转化为列表(str_dict.values())
```

# hot3-最长连续序列

**总结：因为是找最长的连续序列，所以一开始直接转化为set**

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

```
示例 1：
输入：nums = [100,4,200,1,3,2]
输出：4
解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

示例 2：
输入：nums = [0,3,7,2,5,8,4,6,0,1]
输出：9

示例 3：
输入：nums = [1,0,1,2]
输出：3
```

```python
class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        st = set(nums)

        ans = 0
        for x in st:
            if x-1 in st:
                continue
            y = x + 1
            while y in st:
                y += 1
            ans = max(ans, y-x)
        return ans
```

