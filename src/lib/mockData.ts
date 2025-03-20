import { Experiment } from '@/types/experiment';

export const mockExperiments: Experiment[] = [
  {
    id: 'exp-001',
    title: 'Introduction to Data Structures',
    description: 'Learn about basic data structures and their implementations',
    subjectId: 'sub-001',
    dateCreated: new Date().toISOString(),
    labManuals: [
      {
        id: 'lm-001',
        title: 'Arrays and Linked Lists',
        description: 'Understanding arrays and linked lists',
        experimentId: 'exp-001',
        content: '# Arrays and Linked Lists\n\n## Introduction\nArrays and linked lists are fundamental data structures used in programming.\n\n## Arrays\nArrays store elements in contiguous memory locations...',
        dateCreated: new Date().toISOString(),
        problems: [
          {
            id: 'prob-001',
            title: 'Reverse an Array',
            question: 'Write a function to reverse an array without using additional data structures.',
            hints: 'Consider using two pointers approach - one at the beginning and one at the end.',
            labManualId: 'lm-001',
            dateCreated: new Date().toISOString(),
          },
          {
            id: 'prob-002',
            title: 'Implement a Linked List',
            question: 'Implement a singly linked list with methods for insertion, deletion, and traversal.',
            hints: 'Start by defining a Node class with value and next properties.',
            labManualId: 'lm-001',
            dateCreated: new Date().toISOString(),
          }
        ]
      },
      {
        id: 'lm-002',
        title: 'Stacks and Queues',
        description: 'Implementing stack and queue data structures',
        experimentId: 'exp-001',
        content: '# Stacks and Queues\n\n## Introduction\nStacks and queues are abstract data types that serve as collection of elements.\n\n## Stacks\nStacks follow the Last In First Out (LIFO) principle...',
        dateCreated: new Date().toISOString(),
        problems: [
          {
            id: 'prob-003',
            title: 'Implement a Stack',
            question: 'Implement a stack data structure with push, pop, and peek operations.',
            hints: 'You can use an array or a linked list as the underlying data structure.',
            labManualId: 'lm-002',
            dateCreated: new Date().toISOString(),
          }
        ]
      }
    ]
  },
  {
    id: 'exp-002',
    title: 'Sorting Algorithms',
    description: 'Implementing and analyzing different sorting algorithms',
    subjectId: 'sub-001',
    dateCreated: new Date().toISOString(),
    labManuals: [
      {
        id: 'lm-003',
        title: 'Bubble Sort and Selection Sort',
        description: 'Understanding and implementing simple sorting algorithms',
        experimentId: 'exp-002',
        content: '# Simple Sorting Algorithms\n\n## Introduction\nIn this lab, we will explore simple sorting algorithms: Bubble Sort and Selection Sort.\n\n## Bubble Sort\nBubble sort repeatedly steps through the list...',
        dateCreated: new Date().toISOString(),
        problems: [
          {
            id: 'prob-004',
            title: 'Implement Bubble Sort',
            question: 'Write a function to sort an array using the bubble sort algorithm.',
            hints: 'Repeatedly compare adjacent elements and swap them if they are in the wrong order.',
            labManualId: 'lm-003',
            dateCreated: new Date().toISOString(),
          }
        ]
      },
      {
        id: 'lm-004',
        title: 'Quick Sort and Merge Sort',
        description: 'Understanding and implementing advanced sorting algorithms',
        experimentId: 'exp-002',
        content: '# Advanced Sorting Algorithms\n\n## Introduction\nIn this lab, we will explore efficient sorting algorithms: Quick Sort and Merge Sort.\n\n## Quick Sort\nQuick sort is a divide-and-conquer algorithm...',
        dateCreated: new Date().toISOString(),
        problems: [
          {
            id: 'prob-005',
            title: 'Implement Quick Sort',
            question: 'Write a function to sort an array using the quick sort algorithm.',
            hints: 'Use the divide-and-conquer strategy with a pivot element.',
            labManualId: 'lm-004',
            dateCreated: new Date().toISOString(),
          },
          {
            id: 'prob-006',
            title: 'Implement Merge Sort',
            question: 'Write a function to sort an array using the merge sort algorithm.',
            hints: 'Divide the array into halves, sort each half, then merge them.',
            labManualId: 'lm-004',
            dateCreated: new Date().toISOString(),
          }
        ]
      }
    ]
  }
];
