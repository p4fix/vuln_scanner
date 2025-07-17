import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send form data to backend or email service
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Contact Us</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-200">Have questions, feedback, or need support? Reach out to us below!</p>
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-200">Email: <a href="mailto:vulnerability.scanner@gmail.com" className="text-blue-600 dark:text-blue-400 underline">vulnerability.scanner@gmail.com</a></p>
        <p className="text-gray-700 dark:text-gray-200">GitHub: <a href="https://github.com/your-repo-url" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">Project Repository</a></p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-200" htmlFor="name">Name</label>
          <input
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-200" htmlFor="email">Email</label>
          <input
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1 text-gray-900 dark:text-gray-200" htmlFor="message">Message</label>
          <textarea
            className="w-full border rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Send Message
        </button>
        {submitted && (
          <p className="text-green-600 dark:text-green-400 mt-2">Thank you for contacting us! We'll get back to you soon.</p>
        )}
      </form>
    </div>
  );
};

export default Contact; 