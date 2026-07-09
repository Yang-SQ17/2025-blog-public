# hot4-移动零

**总结：利用双指针**

给定一个数组 `nums`，编写一个函数将所有 `0` 移动到数组的末尾，同时保持非零元素的相对顺序。

**请注意** ，必须在不复制数组的情况下原地对数组进行操作。

**示例 1:**

```
输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
```

**示例 2:**

```
输入: nums = [0]
输出: [0]
```

```python
class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        i0 = 0
        for i in range(len(nums)):
            if nums[i]:
                nums[i], nums[i0] = nums[i0], nums[i]
                i0 += 1
```

# hot5-盛最多的水

**总结：利用双指针从两边向中间靠拢**

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

给定一个长度为 `n` 的整数数组 `height` 。有 `n` 条垂线，第 `i` 条线的两个端点是 `(i, 0)` 和 `(i, height[i])` 。

找出其中的两条线，使得它们与 `x` 轴共同构成的容器可以容纳最多的水。

返回容器可以储存的最大水量。

**说明：**你不能倾斜容器。

![](/blogs/LeetCode100(4-6)/\img\5.png)

```
输入：[1,8,6,2,5,4,8,3,7]
输出：49 
解释：图中垂直线代表输入数组 [1,8,6,2,5,4,8,3,7]。在此情况下，容器能够容纳水（表示为蓝色部分）的最大值为 49。
```

**示例 2：**

```
输入：height = [1,1]
输出：1
```

```python
class Solution:
    def maxArea(self, height: List[int]) -> int:
        left = 0
        right = len(height) - 1
        ans = 0
        while left != right:
            cur = (right - left) * min(height[left], height[right])
            ans = max(cur, ans)
            if height[left] > height[right]:
                right -= 1
            else:
                left += 1
        return ans
                    
```

# hot6-三数之和

**总结：首先需要先固定找到一个数i作为第一层for循环，然后从第i+1个数和末尾的数len(nums)-1作为两指针向中间寻找和为0的值**

给你一个整数数组 `nums` ，判断是否存在三元组 `[nums[i], nums[j], nums[k]]` 满足 `i != j`、`i != k` 且 `j != k` ，同时还满足 `nums[i] + nums[j] + nums[k] == 0` 。请你返回所有和为 `0` 且不重复的三元组。

**注意：**答案中不可以包含重复的三元组。

**示例 1：**

```
输入：nums = [-1,0,1,2,-1,-4]
输出：[[-1,-1,2],[-1,0,1]]
解释：
nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。
nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。
nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。
不同的三元组是 [-1,0,1] 和 [-1,-1,2] 。
注意，输出的顺序和三元组的顺序并不重要。
```

**示例 2：**

```
输入：nums = [0,1,1]
输出：[]
解释：唯一可能的三元组和不为 0 。
```

**示例 3：**

```
输入：nums = [0,0,0]
输出：[[0,0,0]]
解释：唯一可能的三元组和为 0 。
```

```python
class Solution:
    def threeSum(self, nums: list[int]) -> list[list[int]]:
        nums.sort()
        ans = []
        n = len(nums)
        for i in range(n - 2):
            x = nums[i]
            if i > 0 and x == nums[i-1]:
                continue
            if x +nums[i+1]+nums[i+2]>0:
                break
            if x+nums[-2]+nums[-1]<0:
                continue
            left = i+1
            right = n-1
            while left<right:
                if x+nums[left]+nums[right]==0:
                    ans.append([x,nums[left],nums[right]])
                    left+=1
                    while left<right and nums[left] == nums[left-1]:
                        left+=1
                    right-=1
                    while right>left and nums[right]==nums[right+1]:
                        right-=1
                elif x+nums[left]+nums[right]>0:
                    right-= 1
                else:
                    left += 1
        return ans
        
```

