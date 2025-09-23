'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useAnimationFrame, wrap, animate, Variants, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Brain, Bot, Zap, Search, Filter, Github, Twitter, Instagram, Facebook, ArrowRight, Mic, Film, Sparkles, PencilRuler, MoreHorizontal, ChevronLeft, ChevronRight, Share2, Code, Database, Lightbulb, Users, Accessibility, ChevronDown, ArrowUp } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Home() {
  // Data untuk carousel AI Populer
  const popularAI = [
    { name: 'ChatGPT', description: 'AI chatbot canggih...', icon: <Bot className="w-8 h-8 text-white" />, color: 'bg-blue-500', url: 'https://chat.openai.com/' },
    { name: 'Midjourney', description: 'Generator gambar AI...', icon: <Zap className="w-8 h-8 text-white" />, color: 'bg-purple-500', url: 'https://www.midjourney.com/' },
    { name: 'DALL-E', description: 'Membuat gambar unik...', icon: <Brain className="w-8 h-8 text-white" />, color: 'bg-green-500', url: 'https://openai.com/dall-e-3/' },
    { name: 'Claude', description: 'AI assistant untuk analisis...', icon: <Search className="w-8 h-8 text-white" />, color: 'bg-orange-500', url: 'https://claude.ai/' },
    { name: 'RunwayML', description: 'AI suite untuk editing video...', icon: <Film className="w-8 h-8 text-white" />, color: 'bg-pink-500', url: 'https://runwayml.com/' },
    { name: 'ElevenLabs', description: 'Generator suara AI...', icon: <Mic className="w-8 h-8 text-white" />, color: 'bg-indigo-500', url: 'https://elevenlabs.io/' },
    { name: 'Perplexity AI', description: 'Mesin pencari berbasis...', icon: <Sparkles className="w-8 h-8 text-white" />, color: 'bg-cyan-500', url: 'https://www.perplexity.ai/' },
    { name: 'Canva Magic', description: 'Fitur desain berbasis AI...', icon: <PencilRuler className="w-8 h-8 text-white" />, color: 'bg-teal-500', url: 'https://www.canva.com/magic-studio/' }
  ];

  // --- DATA BARU UNTUK FITUR FILTER ---
  const allAI = [
    // Chatbot AI
    { name: 'ChatGPT', description: 'AI chatbot canggih untuk percakapan dan asisten virtual.', icon: <Bot className="w-10 h-10 text-white" />, color: 'bg-blue-500', url: 'https://chat.openai.com/', category: 'Chatbot AI', tags: ['Free', 'Premium'] },
    { name: 'Google Gemini', description: 'Model AI multimodal dari Google untuk penalaran kompleks.', icon: <Sparkles className="w-10 h-10 text-white" />, color: 'bg-sky-500', url: 'https://gemini.google.com/', category: 'Chatbot AI', tags: ['Free', 'Premium'] },
    { name: 'Claude', description: 'AI assistant untuk analisis dan penulisan dokumen.', icon: <Search className="w-10 h-10 text-white" />, color: 'bg-orange-500', url: 'https://claude.ai/', category: 'Chatbot AI', tags: ['Free', 'Premium'] },
    { name: 'Ernie Bot', description: 'Chatbot AI komprehensif dari Baidu (Tiongkok) dengan kemampuan multimodal.', icon: <Bot className="w-10 h-10 text-white" />, color: 'bg-blue-700', url: 'https://yiyan.baidu.com/', category: 'Chatbot AI', tags: ['Free', 'Premium'] },
    { name: 'Kimi Chat', description: 'Chatbot dari Moonshot AI (Tiongkok), unggul dalam memproses dokumen panjang.', icon: <Search className="w-10 h-10 text-white" />, color: 'bg-emerald-500', url: 'https://kimi.moonshot.cn/', category: 'Chatbot AI', tags: ['Free'] },
    { name: 'Tongyi Qianwen', description: 'Model AI serbaguna dari Alibaba Cloud (Tiongkok) untuk berbagai tugas.', icon: <Sparkles className="w-10 h-10 text-white" />, color: 'bg-orange-400', url: 'https://tongyi.aliyun.com/', category: 'Chatbot AI', tags: ['Free'] },
    { name: 'Meta Llama 3', description: 'Model bahasa besar open source dari Meta, dapat diakses melalui berbagai platform.', icon: <Bot className="w-10 h-10 text-white" />, color: 'bg-blue-600', url: 'https://llama.meta.com/', category: 'Chatbot AI', tags: ['Free', 'Open Source'] },
    { name: 'Perplexity AI', description: 'Mesin pencari berbasis percakapan yang memberikan jawaban langsung.', icon: <Sparkles className="w-10 h-10 text-white" />, color: 'bg-cyan-500', url: 'https://www.perplexity.ai/', category: 'Chatbot AI', tags: ['Free', 'Premium'] },
    { name: 'DeepSeek', description: 'Model AI open source yang berfokus pada kemampuan coding dan penalaran.', icon: <Search className="w-10 h-10 text-white" />, color: 'bg-green-600', url: 'https://www.deepseek.com/', category: 'Chatbot AI', tags: ['Free', 'Open Source'] },
    { name: 'Poe by Quora', description: 'Platform dari Quora yang menyediakan akses ke berbagai model AI chatbot.', icon: <Bot className="w-10 h-10 text-white" />, color: 'bg-purple-600', url: 'https://poe.com/', category: 'Chatbot AI', tags: ['Free', 'Premium'] },
    { name: 'Chat Z.ai', description: 'Platform chatbot AI untuk percakapan dan interaksi cerdas.', icon: <Bot className="w-10 h-10 text-white" />, color: 'bg-zinc-500', url: 'https://chat.z.ai/', category: 'Chatbot AI', tags: ['Free'] },
    
    // AI Video
    { name: 'RunwayML', description: 'AI suite untuk editing video dan pembuatan konten visual.', icon: <Film className="w-10 h-10 text-white" />, color: 'bg-pink-500', url: 'https://runwayml.com/', category: 'AI Video', tags: ['Premium', 'Commercial'] },
    { name: 'Pika Labs', description: 'Platform video AI untuk kreativitas tanpa batas dari teks.', icon: <Film className="w-10 h-10 text-white" />, color: 'bg-yellow-500', url: 'https://pika.art/', category: 'AI Video', tags: ['Free', 'Premium'] },
    
    // AI Music
    { name: 'ElevenLabs', description: 'Generator suara AI dengan kualitas vokal yang sangat realistis.', icon: <Mic className="w-10 h-10 text-white" />, color: 'bg-indigo-500', url: 'https://elevenlabs.io/', category: 'AI Music', tags: ['Premium'] },
    { name: 'Suno AI', description: 'Buat lagu orisinal lengkap dengan vokal dan instrumen.', icon: <Mic className="w-10 h-10 text-white" />, color: 'bg-lime-500', url: 'https://suno.com/', category: 'AI Music', tags: ['Free', 'Premium'] },
    
    // AI Design
    { name: 'Midjourney', description: 'Generator gambar AI dari teks dengan hasil berkualitas tinggi.', icon: <Zap className="w-10 h-10 text-white" />, color: 'bg-purple-500', url: 'https://www.midjourney.com/', category: 'AI Design', tags: ['Premium'] },
    { name: 'Leonardo.Ai', description: 'Platform untuk menghasilkan aset game dan gambar berkualitas tinggi.', icon: <Zap className="w-10 h-10 text-white" />, color: 'bg-violet-500', url: 'https://leonardo.ai/', category: 'AI Design', tags: ['Free', 'Premium'] },
    { name: 'Canva Magic', description: 'Fitur desain berbasis AI untuk mempercepat proses kreatif.', icon: <PencilRuler className="w-10 h-10 text-white" />, color: 'bg-teal-500', url: 'https://www.canva.com/magic-studio/', category: 'AI Design', tags: ['Free', 'Premium'] },
    { name: 'Stable Diffusion', description: 'Model text-to-image open source yang powerful dan fleksibel.', icon: <Zap className="w-10 h-10 text-white" />, color: 'bg-gray-500', url: 'https://stablediffusionweb.com/', category: 'AI Design', tags: ['Open Source', 'Free'] },
    { name: 'Krita', description: 'Aplikasi lukis digital open source dengan plugin integrasi AI.', icon: <PencilRuler className="w-10 h-10 text-white" />, color: 'bg-sky-500', url: 'https://krita.org/en/', category: 'AI Design', tags: ['Open Source', 'Free'] },
    
    // AI Writing & Productivity
    { name: 'DeepL', description: 'Layanan terjemahan AI (Jerman) dengan akurasi tinggi dan nuansa alami.', icon: <PencilRuler className="w-10 h-10 text-white" />, color: 'bg-blue-800', url: 'https://www.deepl.com/translator', category: 'AI Writing', tags: ['Free', 'Premium'] },
    { name: 'Notion AI', description: 'Asisten tulis cerdas yang terintegrasi langsung di Notion.', icon: <PencilRuler className="w-10 h-10 text-white" />, color: 'bg-black', url: 'https://www.notion.so/product/ai', category: 'AI Writing', tags: ['Premium'] },
    { name: 'GitHub Copilot', description: 'Asisten AI dari GitHub untuk membantu menulis kode lebih cepat dan efisien.', icon: <Github className="w-10 h-10 text-white" />, color: 'bg-gray-800', url: 'https://github.com/features/copilot', category: 'AI Writing', tags: ['Premium', 'Commercial'] },
    { name: 'Fireflies.ai', description: 'Asisten AI untuk merekam, mentranskripsi, dan menganalisis rapat.', icon: <Mic className="w-10 h-10 text-white" />, color: 'bg-red-600', url: 'https://fireflies.ai/', category: 'AI Productivity', tags: ['Free', 'Premium', 'Commercial'] },
    { name: 'Otter.ai', description: 'Layanan transkripsi real-time untuk mengubah percakapan menjadi teks.', icon: <Mic className="w-10 h-10 text-white" />, color: 'bg-sky-600', url: 'https://otter.ai/', category: 'AI Productivity', tags: ['Free', 'Premium'] },

    // Platform AI
    { name: 'Mistral AI', description: 'Model bahasa open-source berperforma tinggi dari Perancis.', icon: <Bot className="w-10 h-10 text-white" />, color: 'bg-red-500', url: 'https://mistral.ai/', category: 'Platform AI', tags: ['Open Source'] },
    { name: 'Hugging Face', description: 'Platform komunitas untuk model, dataset, dan aplikasi machine learning.', icon: <Sparkles className="w-10 h-10 text-white" />, color: 'bg-yellow-400', url: 'https://huggingface.co/', category: 'Platform AI', tags: ['Free', 'Open Source'] },
    { name: 'TensorFlow', description: 'Platform open source end-to-end untuk machine learning dari Google.', icon: <Brain className="w-10 h-10 text-white" />, color: 'bg-orange-600', url: 'https://www.tensorflow.org/', category: 'Platform AI', tags: ['Free', 'Open Source'] },
    { name: 'PyTorch', description: 'Framework machine learning open source yang mempercepat riset dan produksi.', icon: <Zap className="w-10 h-10 text-white" />, color: 'bg-red-500', url: 'https://pytorch.org/', category: 'Platform AI', tags: ['Free', 'Open Source'] },
  ];

  const categories = ['Chatbot AI', 'AI Video', 'AI Music', 'AI Design', 'AI Writing', 'AI Productivity', 'Platform AI'];
  const filters = ['Free', 'Premium', 'Open Source', 'Commercial'];
  const teamMembers = [
    {
      role: 'Project Leader',
      members: ['Ilham Bustomi', 'Reza Putra Nurhudaya', 'Alifiah Firnando'],
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      pulseColor: 'bg-blue-200'
    },
    {
      role: 'UI/UX Designer',
      members: ['Adi Kurnia Sena', 'Farsha Runa', 'Lisa Ardeliana'],
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      pulseColor: 'bg-purple-200'
    },
    {
      role: 'Content Researcher',
      members: ['Putra', 'Fachriza', 'Rara'],
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-100',
      pulseColor: 'bg-teal-200'
    }
  ];

  // --- LOGIKA UNTUK SEAMLESS SCROLL ---
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [halfWidth, setHalfWidth] = useState(0);
  const x = useMotionValue(0);
  const speedFactor = useMotionValue(1);

  useEffect(() => {
    const calculateWidth = () => {
      if (marqueeRef.current) {
        setHalfWidth(marqueeRef.current.scrollWidth / 2);
      }
    };
    calculateWidth();

    const resizeObserver = new ResizeObserver(calculateWidth);
    if (marqueeRef.current) {
      resizeObserver.observe(marqueeRef.current);
    }
    return () => resizeObserver.disconnect();
  }, []);

  useAnimationFrame((time, delta) => {
    const baseSpeed = 80; // pixels per second
    let moveBy = -baseSpeed * (speedFactor.get()) * (delta / 1000);
    if (halfWidth > 0 && speedFactor.get() !== 0) {
      x.set(wrap(0, -halfWidth, x.get() + moveBy));
    }
  });

  const handleDragStart = () => {
    setIsDragging(true);
    speedFactor.set(0);
    speedFactor.stop();
  };

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    const velocity = info.velocity.x;
    const normalizedVelocity = velocity / 2000; // Normalisasi kecepatan
    const boost = 1 - normalizedVelocity * 2; // Faktor pendorong
    const newSpeed = Math.max(0, boost);

    speedFactor.set(newSpeed);
    animate(speedFactor, 1, {
      type: "spring",
      stiffness: 400,
      damping: 40
    });
  };

  const handleNudge = (direction: 'forward' | 'backward') => {
    speedFactor.stop(); // Menghentikan animasi yang sedang berjalan

    const boost = direction === 'forward' ? 12 : -12; // Kecepatan dikurangi agar lebih halus

    // Menganimasikan `speedFactor` untuk efek dorongan yang mulus menggunakan spring
    animate(speedFactor, boost, {
      type: "spring",
      stiffness: 400,
      damping: 40,
      onComplete: () => {
        // Setelah dorongan selesai, kembali ke kecepatan normal secara mulus
        animate(speedFactor, 1, { type: "spring", stiffness: 150, damping: 25 });
      }
    });
  };
  
  // --- STATE MANAGEMENT UNTUK FILTER ---
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [filteredAI, setFilteredAI] = React.useState(allAI);
  const [showAll, setShowAll] = React.useState(false); // State untuk menampilkan semua

  // --- LOGIKA UNTUK FILTER DATA (DIPERBARUI DAN DIPERBAIKI) ---
  React.useEffect(() => {
    const results = allAI.filter(ai => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      const matchCategory = selectedCategory === 'All' || ai.category === selectedCategory;
      
      const matchSearch = searchTerm.trim() === '' || 
        ai.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        ai.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        ai.category.toLowerCase().includes(lowerCaseSearchTerm);

      const matchFilters = selectedFilters.length === 0 || 
        selectedFilters.every(filter => ai.tags.includes(filter));

      return matchCategory && matchSearch && matchFilters;
    });

    setFilteredAI(results);
    setShowAll(false); // Reset ke tampilan terbatas setiap kali filter berubah
  }, [searchTerm, selectedCategory, selectedFilters]);


  const handleCategoryClick = (category: string) => {
    setSelectedCategory(prevCategory => prevCategory === category ? 'All' : category);
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };
  
  const displayCategories = ['All', ...categories];
  const aiToDisplay = showAll ? filteredAI : filteredAI.slice(0, 6);

  // --- LOGIKA UNTUK SMOOTH SCROLL & BACK TO TOP ---
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showBackToTop && window.pageYOffset > 400){
        setShowBackToTop(true)
      } else if (showBackToTop && window.pageYOffset <= 400){
        setShowBackToTop(false)
      }
    };

    window.addEventListener('scroll', checkScrollTop)
    return () => window.removeEventListener('scroll', checkScrollTop)
  }, [showBackToTop]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 64;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --- VARIAN ANIMASI UNTUK FRAMER MOTION ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } },
  };

  const teamCardVariant: Variants = {
    initial: {
      y: 20,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
    hover: {
      y: -10,
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300 }
    }
  };
  
  const avatarRotationVariants: Variants = {
    initial: { 
      rotate: 0,
    },
    hover: {
      rotate: 360,
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-slate-900">Project PKM</span>
            </motion.div>
            <motion.div 
              className="hidden md:flex space-x-8"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-slate-700 hover:text-blue-600 transition-colors" variants={itemVariants}>Home</motion.a>
              <motion.a href="#ai-edu" onClick={(e) => handleScroll(e, 'ai-edu')} className="text-slate-700 hover:text-blue-600 transition-colors" variants={itemVariants}>AI Edu</motion.a>
              <motion.a href="#category" onClick={(e) => handleScroll(e, 'category')} className="text-slate-700 hover:text-blue-600 transition-colors" variants={itemVariants}>Category</motion.a>
              <motion.a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-slate-700 hover:text-blue-600 transition-colors" variants={itemVariants}>About Us</motion.a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px]"></div>
        <div className="absolute inset-0 z-1 bg-gradient-to-b from-slate-50 via-slate-50 to-transparent"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-blue-600">Eksplorasi Kekuatan AI untuk Semua Orang</h1>
              <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">Temukan berbagai tools AI terkini yang dapat membantu meningkatkan produktivitas dan kreativitas Anda dalam berbagai bidang.</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.a 
                    href="#category" 
                    onClick={(e) => handleScroll(e, 'category')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block"
                >
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300">Mulai Eksplorasi</Button>
                </motion.a>
                <motion.a 
                    href="#ai-edu" 
                    onClick={(e) => handleScroll(e, 'ai-edu')}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="block"
                >
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-white/50 backdrop-blur-sm border-slate-300 hover:bg-white transition-colors">Pelajari Lebih Lanjut</Button>
                </motion.a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ type: "spring", stiffness: 100, delay: 0.2 }} 
              className="relative flex items-center justify-center h-64 sm:h-80 lg:h-96 mt-12 lg:mt-0"
            >
              <div className="absolute bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center shadow-2xl shadow-blue-500/20">
                <Brain className="w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 text-white opacity-90" />
              </div>
              <motion.div 
                className="absolute border-2 border-blue-200/50 rounded-full w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96"
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                 <div className="absolute top-1/2 -left-2 w-4 h-4 bg-white rounded-full shadow-md"></div>
              </motion.div>
              <motion.div 
                className="absolute border border-purple-200/50 rounded-full w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem] lg:w-[28rem] lg:h-[28rem]"
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute top-10 right-10 w-3 h-3 bg-white rounded-full shadow-md"></div>
              </motion.div>
               <motion.div 
                className="absolute border border-blue-100/50 rounded-full w-[26rem] h-[26rem] sm:w-[30rem] sm:h-[30rem] lg:w-[32rem] lg:h-[32rem]"
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              >
                 <div className="absolute bottom-20 left-10 w-2 h-2 bg-white rounded-full shadow-md"></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Apa itu Artificial Intelligence Section */}
      <section id="ai-edu" className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <motion.div 
          className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"
          animate={{ x: [-100, 100, -100], y: [-50, 50, -50] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-30"
          animate={{ x: [100, -100, 100], y: [50, -50, 50] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
        />
        <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Memahami Dunia Artificial Intelligence</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">AI bukan hanya tentang robot; ini adalah revolusi teknologi yang mengubah cara kita hidup dan bekerja. Temukan pilar-pilar utamanya di bawah ini.</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                  <Card className="bg-white/50 backdrop-blur-md border-slate-200/80 h-full p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center text-white">
                          <Share2 className="w-8 h-8"/>
                      </div>
                      <CardTitle className="text-xl text-slate-900 mb-2">Machine Learning</CardTitle>
                      <CardDescription>Inti dari AI modern, di mana mesin belajar dari data untuk membuat prediksi atau keputusan tanpa diprogram secara eksplisit.</CardDescription>
                  </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                   <Card className="bg-white/50 backdrop-blur-md border-slate-200/80 h-full p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-purple-400 to-purple-500 flex items-center justify-center text-white">
                          <Code className="w-8 h-8"/>
                      </div>
                      <CardTitle className="text-xl text-slate-900 mb-2">Neural Networks</CardTitle>
                      <CardDescription>Struktur yang terinspirasi dari otak manusia, memungkinkan AI untuk mengenali pola kompleks dalam gambar, suara, dan teks.</CardDescription>
                  </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                   <Card className="bg-white/50 backdrop-blur-md border-slate-200/80 h-full p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gradient-to-br from-teal-400 to-teal-500 flex items-center justify-center text-white">
                          <Database className="w-8 h-8"/>
                      </div>
                      <CardTitle className="text-xl text-slate-900 mb-2">Deep Learning</CardTitle>
                      <CardDescription>Sub-bidang dari Machine Learning yang menggunakan jaringan saraf berlapis-lapis untuk menangani data dalam jumlah sangat besar (Big Data).</CardDescription>
                  </Card>
              </motion.div>
            </div>
        </div>
      </section>

      {/* AI yang paling sering digunakan Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">AI Populer Pilihan Kami</h2>
            <p className="text-lg text-slate-600">Temukan tools AI populer yang banyak digunakan oleh profesional di berbagai industri</p>
          </motion.div>
          <div className="relative group">
            <motion.div 
              className="overflow-hidden"
              style={{ cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing' }}
              onMouseEnter={() => { if (!isDragging) speedFactor.set(0.3); }}
              onMouseLeave={() => { if (!isDragging) speedFactor.set(1); }}
            >
              <motion.div 
                className="flex" 
                ref={marqueeRef} 
                style={{ x }}
                drag="x"
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                {[...popularAI, ...popularAI].map((ai, index) => (
                  <div key={`marquee-${index}-${ai.name}`} className="flex-grow-0 flex-shrink-0 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 min-w-0 px-4">
                    <motion.div whileHover={{ y: -10, transition: { type:'spring', stiffness: 300 } }} className="h-full">
                      <Card className="h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 border-slate-200/80 bg-white">
                        <div>
                          <CardHeader className="text-center">
                            <div className={`w-16 h-16 rounded-full ${ai.color} flex items-center justify-center mx-auto mb-4`}>{ai.icon}</div>
                            <CardTitle className="text-xl">{ai.name}</CardTitle>
                          </CardHeader>
                          <CardContent><CardDescription className="text-center min-h-[40px]">{ai.description}</CardDescription></CardContent>
                        </div>
                        <div className="p-6 pt-0">
                          <a href={ai.url} target="_blank" rel="noopener noreferrer" className="w-full block">
                            <Button className="w-full bg-slate-800 hover:bg-slate-900">Kunjungi AI <ArrowRight className="w-4 h-4 ml-2" /></Button>
                          </a>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.button 
                    onClick={() => handleNudge('backward')}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white transition-colors -translate-x-5 z-10">
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                </motion.button>
                <motion.button 
                    onClick={() => handleNudge('forward')}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white transition-colors translate-x-5 z-10">
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Pilih AI Sesuai Kebutuhanmu Section */}
      <section id="category" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        <div className="absolute -top-1/4 -right-20 w-1/3 h-1/3 bg-purple-50 rounded-full blur-3xl opacity-50 -z-1"></div>
        <div className="absolute -bottom-1/4 -left-20 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl opacity-50 -z-1"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Pilih AI Sesuai Kebutuhanmu</h2>
            <p className="text-lg text-slate-600">Filter dan temukan tools AI yang tepat untuk proyek Anda</p>
          </motion.div>
          
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input placeholder="Cari berdasarkan nama, deskripsi, atau kategori..." className="pl-12 pr-4 py-3 w-full text-base rounded-full border-slate-300 focus:ring-blue-500 focus:border-blue-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start mb-10">
              <motion.div 
                  className="md:col-span-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
              >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center md:text-left">Kategori</h3>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {displayCategories.map((category) => (
                          <motion.div key={category} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                              <Badge 
                                  variant={selectedCategory === category ? 'default' : 'outline'} 
                                  className={`px-4 py-2 cursor-pointer text-sm rounded-full transition-all duration-200 ${selectedCategory === category ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`} 
                                  onClick={() => handleCategoryClick(category)}
                              >
                                  {category}
                              </Badge>
                          </motion.div>
                      ))}
                  </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
              >
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 text-center md:text-left">Filter</h3>
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      {filters.map((filter) => (
                          <motion.div key={filter} whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}>
                              <Badge 
                                  variant={selectedFilters.includes(filter) ? 'default' : 'secondary'} 
                                  className={`px-4 py-2 cursor-pointer text-sm rounded-full transition-all duration-200 ${selectedFilters.includes(filter) ? 'bg-slate-800 text-white border-slate-800' : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`} 
                                  onClick={() => handleFilterClick(filter)}
                              >
                                  {filter}
                              </Badge>
                          </motion.div>
                      ))}
                  </div>
              </motion.div>
          </div>


          <div className="border-t border-slate-200 pt-10">
             <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence>
                  {aiToDisplay.map((ai) => (
                    <motion.div 
                      key={ai.name} 
                      variants={itemVariants} 
                      className="h-full"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      layout
                    >
                      <Card className="h-full flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300 border-slate-200/80 bg-white group overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-start justify-between">
                                <div className={`w-16 h-16 rounded-lg ${ai.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>{ai.icon}</div>
                                <div className="flex flex-col gap-2">
                                    {ai.tags.map(tag => (
                                        <Badge key={tag} variant="secondary" className="text-xs self-end">{tag}</Badge>
                                    ))}
                                </div>
                            </div>
                           <CardTitle className="text-xl pt-2">{ai.name}</CardTitle>
                           <CardDescription className="pt-1 min-h-[60px]">{ai.description}</CardDescription>
                        </div>
                        <div className="p-6 pt-0 bg-slate-50/50">
                         <a href={ai.url} target="_blank" rel="noopener noreferrer" className="w-full block">
                           <Button className="w-full bg-blue-600 hover:bg-blue-700">Kunjungi AI<ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" /></Button>
                         </a>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {aiToDisplay.length === 0 && (
                   <motion.div 
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className="bg-slate-100 rounded-lg p-8 text-center">
                      <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <p className="text-slate-600 text-lg">Tidak ada tool AI yang cocok dengan kriteria Anda.</p>
                      <p className="text-slate-500">Coba ubah kata kunci atau filter pencarian Anda.</p>
                    </div>
                  </motion.div>
                )}
             </motion.div>
            
             {!showAll && filteredAI.length > 6 && (
              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          onClick={() => setShowAll(true)}
                          variant="outline"
                          className="rounded-full w-14 h-14 p-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0"
                          aria-label="View More"
                        >
                          <ChevronDown className="w-8 h-8" />
                        </Button>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Lihat Lebih Banyak</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Membangun Masa Depan dengan AI</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">Kami bukan hanya sekumpulan developer; kami adalah para visioner, kreator, dan problem-solver yang bersatu karena satu keyakinan: AI adalah kunci untuk membuka potensi tak terbatas.</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="bg-white rounded-lg shadow-2xl p-4 transform hover:-rotate-2 transition-transform duration-300">
                  <img src="https://placehold.co/600x450/e0e7ff/374151?text=Inovasi+%26+Kolaborasi" alt="AI Hub Team Collaboration" className="rounded-md w-full h-auto"/>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Inovasi Berkelanjutan</h4>
                    <p className="text-slate-600">Kami terus-menerus mengeksplorasi teknologi terbaru untuk menyajikan tools AI yang paling relevan dan canggih.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Kolaborasi Terbuka</h4>
                    <p className="text-slate-600">Kami percaya bahwa ide-ide terbaik lahir dari kerja sama. Platform kami dibangun untuk komunitas dan oleh komunitas.</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <Accessibility className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">Aksesibilitas untuk Semua</h4>
                    <p className="text-slate-600">Misi kami adalah mendemokratisasi AI, membuatnya mudah diakses dan dipahami oleh siapa pun, di mana pun.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <a href="mailto:contact@aihub.com" className="w-full sm:w-auto">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700">Hubungi Kami</Button>
                </a>
                <a href="mailto:careers@aihub.com" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="w-full bg-white">Bergabung dengan Tim</Button>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Tentang Tim Kami Section */}
          <div id="team" className="mt-24">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Tentang Tim Kami</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">Kami adalah sekelompok mahasiswa yang bersemangat dalam inovasi dan teknologi, berdedikasi untuk membuat AI lebih mudah diakses oleh semua orang.</p>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              {teamMembers.map((team, index) => (
                <motion.div key={index} variants={itemVariants} whileHover="hover" initial="initial" animate="visible">
                  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 h-full overflow-hidden bg-white">
                     <div className="flex flex-col sm:flex-row items-center p-6 gap-6 text-center sm:text-left">
                        <div className="relative flex-shrink-0">
                           <motion.div 
                            className="relative mx-auto w-24 h-24 rounded-full flex items-center justify-center"
                            variants={avatarRotationVariants}
                           >
                              <div className={`absolute inset-0 rounded-full ${team.pulseColor} opacity-50`}/>
                              <div className={`relative w-full h-full rounded-full ${team.bgColor} flex items-center justify-center`}>
                                 <Users className={`w-12 h-12 ${team.iconColor}`} />
                              </div>
                           </motion.div>
                        </div>
                        <div className="flex-grow">
                           <CardTitle className="text-xl">{team.role}</CardTitle>
                           <div className="text-slate-500 mt-2 space-y-1">
                              {team.members.map((member) => (
                                <p key={member}>{member}</p>
                              ))}
                           </div>
                        </div>
                     </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className="flex items-center justify-center md:justify-start mb-4"><Brain className="w-8 h-8 text-blue-400" /><span className="ml-2 text-xl font-bold">Project PKM</span></div>
              <p className="text-gray-400">Platform terdepan untuk menemukan dan menggunakan tools AI terbaik.</p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <motion.li whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-gray-400 hover:text-white transition-colors">Home</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a href="#ai-edu" onClick={(e) => handleScroll(e, 'ai-edu')} className="text-gray-400 hover:text-white transition-colors">AI Edu</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a href="#category" onClick={(e) => handleScroll(e, 'category')} className="text-gray-400 hover:text-white transition-colors">Category</a>
                </motion.li>
                <motion.li whileHover={{ x: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <a href="#about" onClick={(e) => handleScroll(e, 'about')} className="text-gray-400 hover:text-white transition-colors">About Us</a>
                </motion.li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 justify-center md:justify-start">
                <motion.a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Instagram" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Instagram className="w-6 h-6" />
                </motion.a>
                <motion.a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Twitter" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Twitter className="w-6 h-6" />
                </motion.a>
                <motion.a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Facebook" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Facebook className="w-6 h-6" />
                </motion.a>
                <motion.a href="https://www.github.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white" aria-label="Github" whileHover={{ scale: 1.2, y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Github className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>&copy; 2024 Project PKM. All rights reserved.</p>
          </motion.div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
