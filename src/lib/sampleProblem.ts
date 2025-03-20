export const generateSampleProblem = (problemId: string, problemType: string = 'Array') => {
  return {
    id: problemId,
    title: `${problemType} Challenge`,
    question: `
# ${problemType} Challenge

## Problem Statement
Implement a solution to solve the following problem:

${problemType === 'Array' ? 'Given an array of integers, find the contiguous subarray with the largest sum.' : 
  problemType === 'String' ? 'Implement an algorithm to determine if a string has all unique characters.' :
  problemType === 'Tree' ? 'Implement a function to check if a binary tree is balanced.' :
  problemType === 'Graph' ? 'Implement breadth-first search to find the shortest path in an unweighted graph.' :
  problemType === 'Dynamic Programming' ? 'Calculate the nth Fibonacci number using dynamic programming.' :
  'Design and implement an efficient algorithm to solve the given computational problem.'}

## Input Format
- First line: ${problemType === 'Array' ? 'Number of elements n' : 
   problemType === 'String' ? 'A string s' : 
   problemType === 'Tree' ? 'Number of nodes n followed by n lines describing the tree structure' :
   problemType === 'Graph' ? 'Number of vertices V and edges E, followed by E lines with edge descriptions' :
   problemType === 'Dynamic Programming' ? 'An integer n' :
   'Input parameters as specified'}
- ${problemType === 'Array' ? 'Second line: n space-separated integers' : 
   problemType === 'String' ? '' : 
   problemType === 'Tree' ? 'Next n lines: Node values and their children' :
   problemType === 'Graph' ? 'Next E lines: Pairs of vertices (u, v) representing edges' :
   problemType === 'Dynamic Programming' ? '' :
   'Additional input as needed'}

## Output Format
${problemType === 'Array' ? 'The maximum sum of a contiguous subarray.' : 
  problemType === 'String' ? 'True if the string has all unique characters, False otherwise.' :
  problemType === 'Tree' ? 'True if the tree is balanced, False otherwise.' :
  problemType === 'Graph' ? 'The shortest path from the source to destination vertex.' :
  problemType === 'Dynamic Programming' ? 'The nth Fibonacci number.' :
  'The expected output as per problem requirements.'}

## Constraints
- ${problemType === 'Array' ? '1 ≤ n ≤ 10^5' : 
   problemType === 'String' ? '1 ≤ length of s ≤ 10^5' : 
   problemType === 'Tree' ? '1 ≤ n ≤ 10^5' :
   problemType === 'Graph' ? '1 ≤ V, E ≤ 10^5' :
   problemType === 'Dynamic Programming' ? '0 ≤ n ≤ 50' :
   'Input constraints as specified'}
- ${problemType === 'Array' ? '-10^4 ≤ array elements ≤ 10^4' : 
   problemType === 'String' ? 'String contains only ASCII characters' : 
   problemType === 'Tree' ? 'Tree node values are integers' :
   problemType === 'Graph' ? 'Vertices are numbered from 0 to V-1' :
   problemType === 'Dynamic Programming' ? '' :
   'Additional constraints as needed'}

## Example

### Input
\`\`\`
${problemType === 'Array' ? '5\n-2 1 -3 4 -1' : 
  problemType === 'String' ? 'abcdefg' : 
  problemType === 'Tree' ? '5\n1 2 3\n2 4 5\n3 -1 -1\n4 -1 -1\n5 -1 -1' :
  problemType === 'Graph' ? '4 5\n0 1\n0 2\n1 2\n1 3\n2 3' :
  problemType === 'Dynamic Programming' ? '10' :
  'Sample input as specified'}
\`\`\`

### Output
\`\`\`
${problemType === 'Array' ? '4' : 
  problemType === 'String' ? 'True' : 
  problemType === 'Tree' ? 'True' :
  problemType === 'Graph' ? '0 -> 1 -> 3' :
  problemType === 'Dynamic Programming' ? '55' :
  'Expected output'}
\`\`\`

## Explanation
${problemType === 'Array' ? 'The subarray [4] has the largest sum of 4.' : 
  problemType === 'String' ? 'The string "abcdefg" has all unique characters.' : 
  problemType === 'Tree' ? 'The tree is balanced because the height of left and right subtrees of every node differ by at most 1.' :
  problemType === 'Graph' ? 'The shortest path from vertex 0 to vertex 3 is: 0 -> 1 -> 3 with a length of 2 edges.' :
  problemType === 'Dynamic Programming' ? 'The 10th Fibonacci number is 55.' :
  'Detailed explanation of the solution.'}
`,
    hints: `Here are some hints to help you solve this problem:

1. ${problemType === 'Array' ? 'Consider Kadane\'s algorithm for maximum subarray sum.' : 
   problemType === 'String' ? 'Use a hash set or bit vector to track characters.' : 
   problemType === 'Tree' ? 'Calculate the height of each subtree recursively.' :
   problemType === 'Graph' ? 'Use a queue to implement BFS efficiently.' :
   problemType === 'Dynamic Programming' ? 'Use memoization to avoid redundant calculations.' :
   'Start by breaking down the problem into smaller subproblems.'}

2. ${problemType === 'Array' ? 'Maintain two variables: current_sum and max_sum.' : 
   problemType === 'String' ? 'Consider the ASCII value of each character for efficient storage.' : 
   problemType === 'Tree' ? 'A tree is balanced if the height difference of left and right subtrees is at most 1.' :
   problemType === 'Graph' ? 'Keep track of visited vertices to avoid cycles.' :
   problemType === 'Dynamic Programming' ? 'Build your solution iteratively from the base cases.' :
   'Consider edge cases carefully.'}

3. ${problemType === 'Array' ? 'For each element, decide whether to start a new subarray or extend the existing one.' : 
   problemType === 'String' ? 'Use a sliding window approach for larger character sets.' : 
   problemType === 'Tree' ? 'Make sure to handle null nodes correctly.' :
   problemType === 'Graph' ? 'Store the path information during BFS traversal.' :
   problemType === 'Dynamic Programming' ? 'You can use an array to store previously computed values.' :
   'Analyze the time and space complexity of your solution.'}`,
    solution: `\`\`\`${problemType === 'Array' ? 'python' : 
      problemType === 'String' ? 'python' : 
      problemType === 'Tree' ? 'java' :
      problemType === 'Graph' ? 'python' :
      problemType === 'Dynamic Programming' ? 'javascript' :
      'python'}
${problemType === 'Array' ? 'def max_subarray_sum(arr):\n    current_sum = max_sum = arr[0]\n    for i in range(1, len(arr)):\n        current_sum = max(arr[i], current_sum + arr[i])\n        max_sum = max(max_sum, current_sum)\n    return max_sum\n\nn = int(input())\narr = list(map(int, input().split()))\nprint(max_subarray_sum(arr))' : 
problemType === 'String' ? 'def has_unique_chars(s):\n    char_set = set()\n    for char in s:\n        if char in char_set:\n            return False\n        char_set.add(char)\n    return True\n\nstring = input()\nprint(has_unique_chars(string))' : 
problemType === 'Tree' ? 'class TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    \n    TreeNode(int x) {\n        val = x;\n    }\n}\n\nclass Solution {\n    public boolean isBalanced(TreeNode root) {\n        return checkHeight(root) != -1;\n    }\n    \n    private int checkHeight(TreeNode node) {\n        if (node == null) return 0;\n        \n        int leftHeight = checkHeight(node.left);\n        if (leftHeight == -1) return -1;\n        \n        int rightHeight = checkHeight(node.right);\n        if (rightHeight == -1) return -1;\n        \n        if (Math.abs(leftHeight - rightHeight) > 1) return -1;\n        \n        return Math.max(leftHeight, rightHeight) + 1;\n    }\n}' :
problemType === 'Graph' ? 'from collections import defaultdict, deque\n\ndef shortest_path(graph, start, end):\n    visited = set()\n    queue = deque([(start, [start])])\n    \n    while queue:\n        node, path = queue.popleft()\n        \n        if node == end:\n            return path\n        \n        if node not in visited:\n            visited.add(node)\n            \n            for neighbor in graph[node]:\n                if neighbor not in visited:\n                    queue.append((neighbor, path + [neighbor]))\n    \n    return None\n\nV, E = map(int, input().split())\ngraph = defaultdict(list)\n\nfor _ in range(E):\n    u, v = map(int, input().split())\n    graph[u].append(v)\n    graph[v].append(u)  # For undirected graph\n\npath = shortest_path(graph, 0, 3)\nif path:\n    print(" -> ".join(map(str, path)))\nelse:\n    print("No path exists")' :
problemType === 'Dynamic Programming' ? 'function fibonacci(n) {\n    if (n <= 1) return n;\n    \n    let fib = [0, 1];\n    for (let i = 2; i <= n; i++) {\n        fib[i] = fib[i-1] + fib[i-2];\n    }\n    \n    return fib[n];\n}\n\nconst n = parseInt(process.argv[2]);\nconsole.log(fibonacci(n));' :
'# Solution approach would go here\n# with appropriate code implementation\n# based on the specific problem requirements'}
\`\`\``,
    labManualId: 'lm-sample',
    dateCreated: new Date().toISOString(),
    labManual: {
      id: 'lm-sample',
      title: 'Advanced Algorithm Lab',
      experiment: {
        id: 'exp-sample',
        title: 'Algorithm Implementation',
        subject: {
          id: 'sub-sample',
          name: 'Data Structures and Algorithms',
          faculty: {
            id: 'fac-sample',
            user: {
              firstName: 'Professor',
              lastName: 'Smith'
            }
          },
          students: [
            {
              id: 'stud-sample',
              user: {
                firstName: 'Student',
                lastName: 'Jones'
              }
            }
          ]
        }
      }
    }
  };
};
