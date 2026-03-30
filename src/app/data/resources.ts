export interface Resource {
  id: string;
  title: string;
  type: "video" | "article" | "book" | "link";
  category: string;
  description: string;
  author: string;
  duration?: string;
  rating: number;
}

export const resources: Resource[] = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    type: "book",
    category: "Algorithms",
    description: "Comprehensive guide to algorithm design and analysis",
    author: "Thomas H. Cormen",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Understanding Big O Notation",
    type: "video",
    category: "Algorithms",
    description: "Visual explanation of time and space complexity",
    author: "Tech Academy",
    duration: "45 min",
    rating: 4.6,
  },
  {
    id: "3",
    title: "Database Design Best Practices",
    type: "article",
    category: "Databases",
    description: "Learn how to design scalable database schemas",
    author: "Sarah Johnson",
    rating: 4.7,
  },
  {
    id: "4",
    title: "Operating Systems Concepts",
    type: "book",
    category: "Operating Systems",
    description: "Deep dive into OS principles and architecture",
    author: "Abraham Silberschatz",
    rating: 4.9,
  },
  {
    id: "5",
    title: "Machine Learning Crash Course",
    type: "video",
    category: "Machine Learning",
    description: "Quick introduction to ML fundamentals",
    author: "Google Developers",
    duration: "3 hours",
    rating: 4.5,
  },
  {
    id: "6",
    title: "System Design Interview Guide",
    type: "link",
    category: "System Design",
    description: "Comprehensive guide for system design interviews",
    author: "Alex Xu",
    rating: 4.8,
  },
];
