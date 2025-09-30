'use client';

import React, { useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  wrap,
  animate,
  Variants,
  AnimatePresence,
} from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Brain,
  Bot,
  Zap,
  Search,
  Filter,
  Github,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  Mic,
  Film,
  Sparkles,
  PencilRuler,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Share2,
  Code,
  Database,
  Lightbulb,
  Users,
  Accessibility,
  ChevronDown,
  ArrowUp,
  ArrowDownAZ, // Ditambahkan untuk ikon sorting
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export default function Home() {
  // Data untuk carousel AI Populer
  const popularAI = [
    {
      name: 'ChatGPT',
      description: 'AI chatbot canggih...',
      icon: '/icon/ChatGPT_Black.png',
      color: 'bg-white',
      url: 'https://chat.openai.com/',
      shape: 'rounded-full',
    },
    {
      name: 'Midjourney',
      description: 'Generator gambar AI...',
      icon: '/icon/Midjourney.png',
      color: 'bg-gray-800',
      url: 'https://www.midjourney.com/',
      shape: 'rounded-lg',
    },
    {
      name: 'DALL-E 3',
      description: 'Membuat gambar unik...',
      icon: '/icon/ChatGPT.png',
      color: 'bg-black',
      url: 'https://openai.com/dall-e-3/',
      shape: 'rounded-full',
    },
    {
      name: 'Claude',
      description: 'AI assistant untuk analisis...',
      icon: '/icon/Claude.png',
      color: 'bg-orange-100',
      url: 'https://claude.ai/',
      shape: 'rounded-lg',
    },
    {
      name: 'RunwayML',
      description: 'AI suite untuk editing video...',
      icon: '/icon/RunwayML.png',
      color: 'bg-white',
      url: 'https://runwayml.com/',
      shape: 'rounded-lg',
    },
    {
      name: 'ElevenLabs',
      description: 'Generator suara AI...',
      icon: './icon/ElevenLabs.png',
      color: 'bg-white',
      url: 'https://elevenlabs.io/',
      shape: 'rounded-lg',
    },
    {
      name: 'Perplexity AI',
      description: 'Mesin pencari berbasis...',
      icon: '/icon/Perplexity_White.png',
      color: 'bg-black',
      url: 'https://www.perplexity.ai/',
      shape: 'rounded-lg',
    },
    {
      name: 'Canva Magic Studio',
      description: 'Fitur desain berbasis AI...',
      icon: '/icon/Canva_Magic_Studio.png',
      color: 'bg-zinc-100',
      url: 'https://www.canva.com/magic-studio/',
      shape: 'rounded-lg',
    },
  ];

  // --- DATA BARU UNTUK FITUR FILTER ---
  const allAI = [
    // Chatbot AI
    {
      name: 'ChatGPT',
      description: 'AI chatbot canggih untuk percakapan dan asisten virtual.',
      icon: '/icon/ChatGPT_Black.png',
      color: 'bg-white-400',
      url: 'https://chat.openai.com/',
      category: 'Chatbot AI',
      tags: ['Free', 'Premium'],
      shape: 'rounded-full',
    },
    {
      name: 'Google Gemini',
      description: 'Model AI multimodal dari Google untuk penalaran kompleks.',
      icon: '/icon/Gemini.png',
      color: 'bg-white',
      url: 'https://gemini.google.com/',
      category: 'Chatbot AI',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Claude',
      description: 'AI assistant untuk analisis dan penulisan dokumen.',
      icon: '/icon/Claude.png',
      color: 'bg-orange-100',
      url: 'https://claude.ai/',
      category: 'Chatbot AI',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Ernie Bot',
      description:
        'Chatbot AI komprehensif dari Baidu (Tiongkok) dengan kemampuan multimodal.',
      icon: '/icon/Ernie_Bot.png',
      color: 'bg-white-100',
      url: 'https://yiyan.baidu.com/',
      category: 'Chatbot AI',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Kimi Chat',
      description:
        'Chatbot dari Moonshot AI (Tiongkok), unggul dalam memproses dokumen panjang.',
      icon: '/icon/Kimi.png',
      color: 'bg-black',
      url: 'https://kimi.moonshot.cn/',
      category: 'Chatbot AI',
      tags: ['Free'],
      shape: 'rounded-lg',
    },
    {
      name: 'Tongyi Qianwen',
      description:
        'Model AI serbaguna dari Alibaba Cloud (Tiongkok) untuk berbagai tugas.',
      icon: '/icon/Tongyi_Qianwen.png',
      color: 'bg-white-500',
      url: 'https://tongyi.aliyun.com/',
      category: 'Chatbot AI',
      tags: ['Free'],
      shape: 'rounded-full',
    },
    {
      name: 'Meta Llama 3',
      description:
        'Model bahasa besar open source dari Meta, dapat diakses melalui berbagai platform.',
      icon: '/icon/Llama-3.png',
      color: 'bg-white-900',
      url: 'https://llama.meta.com/',
      category: 'Chatbot AI',
      tags: ['Free', 'Open Source'],
      shape: 'rounded-lg',
    },
    {
      name: 'Perplexity AI',
      description:
        'Mesin pencari berbasis percakapan yang memberikan jawaban langsung.',
      icon: '/icon/Perplexity_White.png',
      color: 'bg-black',
      url: 'https://www.perplexity.ai/',
      category: 'Chatbot AI',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'DeepSeek',
      description:
        'Model AI open source yang berfokus pada kemampuan coding dan penalaran.',
      icon: '/icon/Deepseek.png',
      color: 'bg-white-200',
      url: 'https://www.deepseek.com/',
      category: 'Chatbot AI',
      tags: ['Free', 'Open Source'],
      shape: 'rounded-lg',
    },
    {
      name: 'GLM-4.5',
      description: 'Platform chatbot AI untuk percakapan dan interaksi cerdas.',
      icon: '/icon/Chat Z.ai_Black.png',
      color: 'bg-zinc-100',
      url: 'https://chat.z.ai/',
      category: 'Chatbot AI',
      tags: ['Free'],
      shape: 'rounded-lg',
    },
    {
      name: 'Copilot Microsoft',
      description: 'Asisten AI dari Microsoft yang terintegrasi di berbagai produk.',
      icon: '/icon/Copilot_Microsoft.png',
      color: 'bg-white',
      url: 'https://copilot.microsoft.com/',
      category: 'Chatbot AI',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Grok AI',
      description: 'Chatbot AI dari xAI dengan akses real-time ke platform X.',
      icon: '/icon/Grok.png',
      color: 'bg-black',
      url: 'https://grok.com',
      category: 'Chatbot AI',
      tags: ['Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'SiteGPT',
      description: 'Buat chatbot kustom untuk website Anda dalam sekejap.',
      icon: '/icon/SiteGPT.png',
      color: 'bg-blue-600',
      url: 'https://sitegpt.ai',
      category: 'Chatbot AI',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },

    // AI Video
    {
      name: 'RunwayML',
      description: 'AI suite untuk editing video dan pembuatan konten visual.',
      icon: '/icon/RunwayML.png',
      color: 'bg-white',
      url: 'https://runwayml.com/',
      category: 'AI Video',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },
    {
      name: 'Pika Labs',
      description: 'Platform video AI untuk kreativitas tanpa batas dari teks.',
      icon: '/icon/Pika_Labs.png',
      color: 'bg-black',
      url: 'https://pika.art/',
      category: 'AI Video',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
     {
      name: 'Steve AI',
      description: 'AI untuk membuat video animasi dan live-action dengan cepat.',
      icon: '/icon/Steve.png',
      color: 'bg-white',
      url: 'https://www.steve.ai',
      category: 'AI Video',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'HeyGen AI',
      description: 'Platform video AI untuk membuat video juru bicara realistis.',
      icon: '/icon/HeyGen.png',
      color: 'bg-white',
      url: 'https://www.heygen.com',
      category: 'AI Video',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },
    {
      name: 'Synthesia AI',
      description: 'Buat video profesional dengan avatar AI dalam berbagai bahasa.',
      icon: '/icon/Synthesia.png',
      color: 'bg-white',
      url: 'https://www.synthesia.io',
      category: 'AI Video',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },

    // AI Music
    {
      name: 'ElevenLabs',
      description:
        'Generator suara AI dengan kualitas vokal yang sangat realistis.',
      icon: '/icon/ElevenLabs.png',
      color: 'bg-white',
      url: 'https://elevenlabs.io/',
      category: 'AI Music',
      tags: ['Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Suno AI',
      description: 'Buat lagu orisinal lengkap dengan vokal dan instrumen.',
      icon: '/icon/Suno.png',
      color: 'bg-black',
      url: 'https://suno.com/',
      category: 'AI Music',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Soundful',
      description: 'Hasilkan musik bebas royalti yang disesuaikan untuk kebutuhan Anda.',
      icon: '/icon/Soundful.webp',
      color: 'bg-white',
      url: 'https://soundful.com',
      category: 'AI Music',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Uberduck',
      description: 'AI untuk text-to-speech, sintesis suara, dan rap vokal.',
      icon: '/icon/Uberduck.png',
      color: 'bg-white-100',
      url: 'https://www.uberduck.ai/',
      category: 'AI Music',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Boomy AI',
      description: 'Buat lagu orisinal dalam hitungan detik dan bagikan ke dunia.',
      icon: '/icon/Boomy-AI.png',
      color: 'bg-white',
      url: 'https://boomy.com',
      category: 'AI Music',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },


    // AI Design
    {
      name: 'Midjourney',
      description:
        'Generator gambar AI dari teks dengan hasil berkualitas tinggi.',
      icon: '/icon/Midjourney.png',
      color: 'bg-gray-800',
      url: 'https://www.midjourney.com/',
      category: 'AI Design',
      tags: ['Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Leonardo.Ai',
      description:
        'Platform untuk menghasilkan aset game dan gambar berkualitas tinggi.',
      icon: '/icon/Leonardo_Ai.png',
      color: 'bg-black',
      url: 'https://leonardo.ai/',
      category: 'AI Design',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Canva Magic Studio',
      description: 'Fitur desain berbasis AI untuk mempercepat proses kreatif.',
      icon: '/icon/Canva_Magic_Studio.png',
      color: 'bg-zinc-100',
      url: 'https://www.canva.com/ai-assistant/',
      category: 'AI Design',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Stable Diffusion',
      description:
        'Model text-to-image open source yang powerful dan fleksibel.',
      icon: '/icon/Stable_Diffusion.png',
      color: 'bg-white',
      url: 'https://stablediffusionweb.com/',
      category: 'AI Design',
      tags: ['Open Source', 'Free'],
      shape: 'rounded-full',
    },
    {
      name: 'Krita',
      description:
        'Aplikasi lukis digital open source dengan plugin integrasi AI.',
      icon: '/icon/Krita.png',
      color: 'bg-white',
      url: 'https://krita.org/en/',
      category: 'AI Design',
      tags: ['Open Source', 'Free'],
      shape: 'rounded-lg',
    },
    {
      name: 'DALL-E 3',
      description: 'Model AI dari OpenAI yang dapat membuat gambar dari deskripsi teks.',
      icon: '/icon/ChatGPT.png',
      color: 'bg-black',
      url: 'https://openai.com/id-ID/index/dall-e-3/',
      category: 'AI Design',
      tags: ['Premium'],
      shape: 'rounded-full',
    },
    {
      name: 'Flair AI',
      description: 'Alat desain AI untuk membuat konten bermerek dengan mudah.',
      icon: '/icon/Flair_AI.png',
      color: 'bg-white',
      url: 'https://flair.ai',
      category: 'AI Design',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },
    {
      name: 'Nano Banana',
      description: 'Generator gambar AI yang cepat dan mudah digunakan.',
      icon: '/icon/Nano_Banana.png',
      color: 'bg-yellow-300',
      url: 'https://nanobanana.ai/',
      category: 'AI Design',
      tags: ['Free'],
      shape: 'rounded-lg',
    },

    // AI Writing
    {
      name: 'DeepL',
      description:
        'Layanan terjemahan AI (Jerman) dengan akurasi tinggi dan nuansa alami.',
      icon: '/icon/DeepL.png',
      color: 'bg-white',
      url: 'https://www.deepl.com/translator',
      category: 'AI Writing',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Notion AI',
      description: 'Asisten tulis cerdas yang terintegrasi langsung di Notion.',
      icon: 'https://www.notion.so/images/favicon.ico',
      color: 'bg-white',
      url: 'https://www.notion.so/product/ai',
      category: 'AI Writing',
      tags: ['Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'GitHub Copilot',
      description:
        'Asisten AI dari GitHub untuk membantu menulis kode lebih cepat dan efisien.',
      icon: '/icon/Github_Copilot.png',
      color: 'bg-black',
      url: 'https://github.com/features/copilot',
      category: 'AI Writing',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },
     {
      name: 'Grammarly AI',
      description: 'Asisten penulisan AI untuk tata bahasa, gaya, dan nada.',
      icon: '/icon/Grammarly_AI.png',
      color: 'bg-white',
      url: 'https://www.grammarly.com',
      category: 'AI Writing',
      tags: ['Free', 'Premium'],
      shape: 'rounded-full',
    },
    {
      name: 'Jasper',
      description: 'Platform konten AI untuk tim marketing dan bisnis.',
      icon: '/icon/Jasper_AI.png',
      color: 'bg-white',
      url: 'https://www.jasper.ai',
      category: 'AI Writing',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },
    {
      name: 'QuillBot',
      description: 'Alat parafrase dan penulis ringkasan untuk tulisan yang lebih baik.',
      icon: '/icon/QuillBot.png',
      color: 'bg-white',
      url: 'https://quillbot.com',
      category: 'AI Writing',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Jenni AI',
      description: 'Asisten penulisan AI untuk membantu riset dan menulis esai.',
      icon: '/icon/Jenni_AI.png',
      color: 'bg-white',
      url: 'https://jenni.ai/',
      category: 'AI Writing',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Rytr',
      description: 'Asisten penulisan AI untuk membuat konten berkualitas tinggi.',
      icon: '/icon/Rytr.png',
      color: 'bg-white',
      url: 'https://rytr.me',
      category: 'AI Writing',
      tags: ['Free', 'Premium'],
      shape: 'rounded-full',
    },
    {
      name: 'Writesonic',
      description: 'AI Writer untuk membuat artikel, iklan, dan email yang SEO-friendly.',
      icon: '/icon/Writesonic.png',
      color: 'bg-white',
      url: 'https://writesonic.com',
      category: 'AI Writing',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },

    // AI Productivity
    {
      name: 'Fireflies.ai',
      description:
        'Asisten AI untuk merekam, mentranskripsi, dan menganalisis rapat.',
      icon: '/icon/Fireflies.png',
      color: 'bg-white',
      url: 'https://fireflies.ai/',
      category: 'AI Productivity',
      tags: ['Free', 'Premium', 'Commercial'],
      shape: 'rounded-lg',
    },
    {
      name: 'Otter.ai',
      description:
        'Layanan transkripsi real-time untuk mengubah percakapan menjadi teks.',
      icon: '/icon/Otter.png',
      color: 'bg-white',
      url: 'https://otter.ai/',
      category: 'AI Productivity',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Speechify AI',
      description: 'Aplikasi Text-to-Speech untuk mendengarkan bacaan apa pun.',
      icon: '/icon/Speechify.png',
      color: 'bg-blue-700',
      url: 'https://speechify.com/',
      category: 'AI Productivity',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Answer The Public',
      description: 'Alat riset untuk visualisasi data pencarian dan ide konten.',
      icon: '/icon/Answer_The_Public.png',
      color: 'bg-white',
      url: 'https://answerthepublic.com',
      category: 'AI Productivity',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Humata AI',
      description: 'AI untuk menganalisis dan meringkas file PDF dan dokumen.',
      icon: '/icon/Humata.png',
      color: 'bg-orange-50',
      url: 'https://www.humata.ai',
      category: 'AI Productivity',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Connected Papers',
      description: 'Alat visual untuk peneliti menemukan dan menjelajahi makalah akademis.',
      icon: '/icon/Connected_Papers.png',
      color: 'bg-white',
      url: 'https://www.connectedpapers.com',
      category: 'AI Productivity',
      tags: ['Free'],
      shape: 'rounded-lg',
    },
    {
      name: 'Blackbox AI',
      description: 'Asisten AI coding untuk mencari cuplikan kode terbaik.',
      icon: '/icon/Blackbox.png',
      color: 'bg-black',
      url: 'https://www.blackbox.ai',
      category: 'AI Productivity',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },

    // Platform AI
    {
      name: 'Mistral AI',
      description: 'Model bahasa open-source berperforma tinggi dari Perancis.',
      icon: '/icon/Mistral_AI.png',
      color: 'bg-white',
      url: 'https://mistral.ai/',
      category: 'Platform AI',
      tags: ['Open Source'],
      shape: 'rounded-lg',
    },
    {
      name: 'Hugging Face',
      description:
        'Platform komunitas untuk model, dataset, dan aplikasi machine learning.',
      icon: '/icon/Hugging_Face.png',
      color: 'bg-white',
      url: 'https://huggingface.co/',
      category: 'Platform AI',
      tags: ['Free', 'Open Source'],
      shape: 'rounded-lg',
    },
    {
      name: 'TensorFlow',
      description:
        'Platform open source end-to-end untuk machine learning dari Google.',
      icon: '/icon/TensorFlow.png',
      color: 'bg-white',
      url: 'https://www.tensorflow.org/',
      category: 'Platform AI',
      tags: ['Free', 'Open Source'],
      shape: 'rounded-lg',
    },
    {
      name: 'PyTorch',
      description:
        'Framework machine learning open source yang mempercepat riset dan produksi.',
      icon: '/icon/PyTorch.png',
      color: 'bg-white',
      url: 'https://pytorch.org/',
      category: 'Platform AI',
      tags: ['Free', 'Open Source'],
      shape: 'rounded-lg',
    },
    {
      name: 'somAI',
      description: 'Platform AI dari Indonesia untuk berbagai solusi bisnis.',
      icon: '/icon/SomAI.png',
      color: 'bg-white',
      url: 'https://somai.id',
      category: 'Platform AI',
      tags: ['Commercial'],
      shape: 'rounded-lg',
    },

    // AI Marketing
    {
      name: 'AdCreative.ai',
      description: 'Hasilkan materi iklan dan postingan media sosial yang berfokus pada konversi.',
      icon: '/icon/AdCreative.ai.png',
      color: 'bg-white',
      url: 'https://id.adcreative.ai',
      category: 'AI Marketing',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },
    {
      name: 'Simplified',
      description: 'Aplikasi all-in-one untuk marketing: desain, video, penulisan AI.',
      icon: '/icon/Simplified.png',
      color: 'bg-black',
      url: 'https://simplified.com',
      category: 'AI Marketing',
      tags: ['Free', 'Premium'],
      shape: 'rounded-lg',
    },
    {
      name: 'Pencil AI',
      description: 'Platform AI generatif untuk membuat iklan yang efektif.',
      icon: '/icon/Pencil_AI.PNG',
      color: 'bg-white',
      url: 'https://trypencil.com',
      category: 'AI Marketing',
      tags: ['Premium', 'Commercial'],
      shape: 'rounded-lg',
    },

  ];

  const categories = [
    'Chatbot AI',
    'AI Video',
    'AI Music',
    'AI Design',
    'AI Writing',
    'AI Productivity',
    'Platform AI',
    'AI Marketing',
  ];
  const filters = ['Free', 'Premium', 'Open Source', 'Commercial'];
  const teamMembers = [
    {
      role: 'Project Leader',
      members: ['Ilham Bustomi', 'Reza Putra Nurhudaya', 'Alifiah Firnando'],
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      auraColors: { from: '#60A5FA', to: '#7DD3FC' },
    },
    {
      role: 'UI/UX Designer',
      members: ['Adi Kurnia Sena', 'Farsya Runa Supriatna', 'Lisa Ardeliana'],
      iconColor: 'text-purple-600',
      bgColor: 'bg-purple-100',
      auraColors: { from: '#C084FC', to: '#F9A8D4' },
    },
    {
      role: 'Content Researcher',
      members: [
        'Putra Bagus Satrio',
        'Fachriza Khairul Fajri',
        'Rara Anggraeni',
        'Fahri Patir Ramadhan',
      ],
      iconColor: 'text-teal-600',
      bgColor: 'bg-teal-100',
      auraColors: { from: '#2DD4BF', to: '#6EE7B7' },
    },
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
    let moveBy = -baseSpeed * speedFactor.get() * (delta / 1000);
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
      type: 'spring',
      stiffness: 400,
      damping: 40,
    });
  };

  const handleNudge = (direction: 'forward' | 'backward') => {
    speedFactor.stop(); // Menghentikan animasi yang sedang berjalan

    const boost = direction === 'forward' ? 12 : -12; // Kecepatan dikurangi agar lebih halus

    // Menganimasikan `speedFactor` untuk efek dorongan yang mulus menggunakan spring
    animate(speedFactor, boost, {
      type: 'spring',
      stiffness: 400,
      damping: 40,
      onComplete: () => {
        // Setelah dorongan selesai, kembali ke kecepatan normal secara mulus
        animate(speedFactor, 1, {
          type: 'spring',
          stiffness: 150,
          damping: 25,
        });
      },
    });
  };

  // --- STATE MANAGEMENT UNTUK FILTER ---
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
  const [sortOrder, setSortOrder] = React.useState('default'); // State baru untuk sorting
  const [filteredAI, setFilteredAI] = React.useState(allAI);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- LOGIKA UNTUK FILTER DAN SORT DATA ---
  React.useEffect(() => {
    let results = allAI.filter((ai) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const matchCategory =
        selectedCategory === 'All' || ai.category === selectedCategory;
      const matchSearch =
        searchTerm.trim() === '' ||
        ai.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        ai.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        ai.category.toLowerCase().includes(lowerCaseSearchTerm);
      const matchFilters =
        selectedFilters.length === 0 ||
        selectedFilters.every((filter) => ai.tags.includes(filter));
      return matchCategory && matchSearch && matchFilters;
    });

    // Logika sorting ditambahkan di sini
    if (sortOrder === 'a-z') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredAI(results);
  }, [searchTerm, selectedCategory, selectedFilters, sortOrder]); // sortOrder ditambahkan ke dependencies

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === category ? 'All' : category
    );
  };

  const handleFilterClick = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleSortClick = () => {
    setSortOrder(prev => prev === 'a-z' ? 'default' : 'a-z');
  };

  const displayCategories = ['All', ...categories];

  // --- LOGIKA UNTUK BACK TO TOP ---
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      setShowBackToTop(window.pageYOffset > 400);
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
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
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  const teamCardVariant: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
    hover: {
      y: -10,
      transition: { type: 'spring', stiffness: 300 },
    },
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
    <div className='min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden'>
      {/* Navigation */}
      <nav className='bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <motion.div
              className='flex items-center'
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Brain className='w-8 h-8 text-blue-600' />
              <span className='ml-2 text-xl font-bold text-slate-900'>
                Proyek PKM
              </span>
            </motion.div>
            <motion.div
              className='hidden md:flex space-x-8'
              initial='hidden'
              animate='visible'
              variants={containerVariants}
            >
              <motion.a
                href='#home'
                onClick={(e) => handleScroll(e, 'home')}
                className='text-slate-700 hover:text-blue-600 transition-colors'
                variants={itemVariants}
              >
                Beranda
              </motion.a>
              <motion.a
                href='#ai-edu'
                onClick={(e) => handleScroll(e, 'ai-edu')}
                className='text-slate-700 hover:text-blue-600 transition-colors'
                variants={itemVariants}
              >
                Edukasi AI
              </motion.a>
              <motion.a
                href='#category'
                onClick={(e) => handleScroll(e, 'category')}
                className='text-slate-700 hover:text-blue-600 transition-colors'
                variants={itemVariants}
              >
                Kategori
              </motion.a>
              <motion.a
                href='#about'
                onClick={(e) => handleScroll(e, 'about')}
                className='text-slate-700 hover:text-blue-600 transition-colors'
                variants={itemVariants}
              >
                Tentang Kami
              </motion.a>
              <motion.a
                href='#team'
                onClick={(e) => handleScroll(e, 'team')}
                className='text-slate-700 hover:text-blue-600 transition-colors'
                variants={itemVariants}
              >
                Team Kami
              </motion.a>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id='home'
        className='relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8'
      >
        <div className='absolute inset-0 z-0 opacity-50 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px]'></div>
        <div className='absolute inset-0 z-1 bg-gradient-to-b from-slate-50 via-slate-50 to-transparent'></div>

        <div className='max-w-7xl mx-auto relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className='text-center lg:text-left'
            >
              <h1 className='text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-br from-slate-900 to-blue-600'>
                Jelajahi Kekuatan AI untuk Semua
              </h1>
              <p className='mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed'>
                Temukan beragam alat AI terkini yang dapat membantu meningkatkan
                produktivitas dan kreativitas Anda dalam berbagai bidang.
              </p>
              <div className='mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                <motion.a
                  href='#category'
                  onClick={(e) => handleScroll(e, 'category')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className='block'
                >
                  <Button
                    size='lg'
                    className='bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto shadow-lg hover:shadow-blue-500/30 transition-shadow duration-300'
                  >
                    Mulai Menjelajah
                  </Button>
                </motion.a>
                <motion.a
                  href='#ai-edu'
                  onClick={(e) => handleScroll(e, 'ai-edu')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className='block'
                >
                  <Button
                    variant='outline'
                    size='lg'
                    className='w-full sm:w-auto bg-white/50 backdrop-blur-sm border-slate-300 hover:bg-white transition-colors'
                  >
                    Pelajari Selengkapnya
                  </Button>
                </motion.a>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
              className='relative flex items-center justify-center h-64 sm:h-80 lg:h-96 mt-12 lg:mt-0'
            >
              <div className='absolute bg-gradient-to-br from-blue-500 to-purple-600 rounded-full w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 flex items-center justify-center shadow-2xl shadow-blue-500/20'>
                <Brain className='w-28 h-28 sm:w-36 sm:h-36 lg:w-40 lg:h-40 text-white opacity-90' />
              </div>
              <motion.div
                className='absolute border-2 border-blue-200/50 rounded-full w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96'
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                <div className='absolute top-1/2 -left-2 w-4 h-4 bg-white rounded-full shadow-md'></div>
              </motion.div>
              <motion.div
                className='absolute border border-purple-200/50 rounded-full w-[22rem] h-[22rem] sm:w-[26rem] sm:h-[26rem] lg:w-[28rem] lg:h-[28rem]'
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                <div className='absolute top-10 right-10 w-3 h-3 bg-white rounded-full shadow-md'></div>
              </motion.div>
              <motion.div
                className='absolute border border-blue-100/50 rounded-full w-[26rem] h-[26rem] sm:w-[30rem] sm:h-[30rem] lg:w-[32rem] lg:h-[32rem]'
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
              >
                <div className='absolute bottom-20 left-10 w-2 h-2 bg-white rounded-full shadow-md'></div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Apa itu Artificial Intelligence Section */}
      <section
        id='ai-edu'
        className='relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#1A2A80] to-[#05091A] text-white overflow-hidden'
      >
        {/* Notch effect */}
        <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-32 h-16 bg-slate-50 [clip-path:ellipse(50%_100%_at_50%_0%)]'></div>
        <div className='max-w-7xl mx-auto relative z-10'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-6'>
                Apa Itu Artificial Intelligence (AI)?
              </h2>
              <p className='text-lg text-slate-300 leading-relaxed'>
                Artificial Intelligence (AI) adalah teknologi yang membuat
                komputer dapat berpikir dan bekerja layaknya manusia. Dengan AI,
                kita bisa menulis lebih cepat, membuat gambar, menghasilkan
                musik, bahkan membantu bisnis dan pendidikan.
              </p>
            </motion.div>
            <motion.div
              className='grid grid-cols-2 gap-4'
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              <motion.div
                className='relative col-span-1 group'
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className='aspect-[3/4] relative'>
                  <img
                    src='https://placehold.co/400x533/1e293b/ffffff?text=Developer'
                    alt='AI helping a developer code'
                    className='w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white/20'
                  />
                  <div className='absolute bottom-4 left-4 right-4 p-2 bg-slate-900/30 backdrop-blur-md rounded-xl border border-white/20 text-center'>
                    <p className='font-medium text-white'>Future</p>
                  </div>
                </div>
              </motion.div>
              <div className='col-span-1 flex flex-col gap-4'>
                <motion.div
                  className='relative group'
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className='aspect-video relative'>
                    <img
                      src='https://placehold.co/400x250/1e293b/ffffff?text=AI+Brain'
                      alt='AI computer engine brain'
                      className='w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white/20'
                    />
                    <div className='absolute bottom-4 left-4 right-4 p-2 bg-slate-900/30 backdrop-blur-md rounded-xl border border-white/20 text-center'>
                      <p className='font-medium text-white'>Computer engine</p>
                    </div>
                  </div>
                </motion.div>
                <motion.div
                  className='relative group'
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className='aspect-video relative'>
                    <img
                      src='https://placehold.co/400x250/1e293b/ffffff?text=Creativity'
                      alt='AI enhancing creativity'
                      className='w-full h-full object-cover rounded-2xl shadow-lg border-2 border-white/20'
                    />
                    <div className='absolute bottom-4 left-4 right-4 p-2 bg-slate-900/30 backdrop-blur-md rounded-xl border border-white/20 text-center'>
                      <p className='font-medium text-white'>Think more</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AI Populer Pilihan Kami Section */}
      <section className='py-16 sm:py-20 bg-slate-50 overflow-hidden'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            className='text-center mb-12 px-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 mb-4'>
              AI Populer Pilihan Kami
            </h2>
            <p className='text-lg text-slate-600'>
              Jelajahi alat AI populer yang sering digunakan oleh para
              profesional di berbagai industri.
            </p>
          </motion.div>
          <div className='relative group'>
            <div className='absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none'></div>
            <div className='absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none'></div>
            <motion.div
              className='overflow-hidden'
              style={{ cursor: 'grab' }}
              whileTap={{ cursor: 'grabbing' }}
              onMouseEnter={() => {
                if (!isDragging) speedFactor.set(0.3);
              }}
              onMouseLeave={() => {
                if (!isDragging) speedFactor.set(1);
              }}
            >
              <motion.div
                className='flex'
                ref={marqueeRef}
                style={{ x }}
                drag='x'
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                {[...popularAI, ...popularAI].map((ai, index) => (
                  <div
                    key={`marquee-${index}-${ai.name}`}
                    className='flex-grow-0 flex-shrink-0 basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 min-w-0 px-4'
                  >
                    <motion.div
                      whileHover={{
                        y: -10,
                        transition: { type: 'spring', stiffness: 300 },
                      }}
                      className='h-full'
                    >
                      <Card className='h-full flex flex-col justify-between hover:shadow-xl transition-shadow duration-300 border-slate-200/80 bg-white'>
                        <div>
                          <CardHeader className='text-center'>
                            <div
                              className={`w-16 h-16 ${ai.shape} ${ai.color} flex items-center justify-center mx-auto mb-4 p-2`}
                            >
                              {typeof ai.icon === 'string' ? (
                                <img src={ai.icon} alt={`${ai.name} logo`} className="w-full h-full object-contain"/>
                              ) : (
                                ai.icon
                              )}
                            </div>
                            <CardTitle className='text-xl'>{ai.name}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className='text-center min-h-[40px]'>
                              {ai.description}
                            </CardDescription>
                          </CardContent>
                        </div>
                        <div className='p-6 pt-0'>
                          <a
                            href={ai.url}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='w-full block'
                          >
                            <Button className='w-full bg-slate-800 hover:bg-slate-900'>
                              Kunjungi AI{' '}
                              <ArrowRight className='w-4 h-4 ml-2' />
                            </Button>
                          </a>
                        </div>
                      </Card>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <div className='absolute inset-0 flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <motion.button
                onClick={() => handleNudge('backward')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white transition-colors -translate-x-5 z-10'
              >
                <ChevronLeft className='w-6 h-6 text-gray-700' />
              </motion.button>
              <motion.button
                onClick={() => handleNudge('forward')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='pointer-events-auto bg-white/80 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-white transition-colors translate-x-5 z-10'
              >
                <ChevronRight className='w-6 h-6 text-gray-700' />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Pilih AI Sesuai Kebutuhanmu Section */}
      <section
        id='category'
        className='py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden'
      >
        <div className='absolute inset-0 z-0 opacity-50 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px]'></div>
        <div className='absolute -top-1/4 -right-20 w-1/3 h-1/3 bg-purple-50 rounded-full blur-3xl opacity-50 -z-1'></div>
        <div className='absolute -bottom-1/4 -left-20 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl opacity-50 -z-1'></div>

        <div className='max-w-7xl mx-auto relative z-10'>
          <motion.div
            className='text-center mb-12'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 mb-4'>
              Temukan AI Sesuai Kebutuhan Anda
            </h2>
            <p className='text-lg text-slate-600'>
              Saring dan temukan alat AI yang paling sesuai untuk proyek Anda.
            </p>
          </motion.div>

          <motion.div
            className='mb-8'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='relative max-w-lg mx-auto'>
              <Search className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5' />
              <Input
                placeholder='Cari berdasarkan nama, deskripsi, atau kategori...'
                className='pl-12 pr-4 py-3 w-full text-base rounded-full border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </motion.div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start mb-10'>
            <motion.div
              className='md:col-span-2'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className='text-lg font-semibold text-slate-900 mb-4 text-center md:text-left'>
                Kategori
              </h3>
              <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                {displayCategories.map((category) => (
                  <motion.div
                    key={category}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={
                        selectedCategory === category ? 'default' : 'outline'
                      }
                      className={`px-4 py-2 cursor-pointer text-sm rounded-full transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
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
              <h3 className='text-lg font-semibold text-slate-900 mb-4 text-center md:text-left'>
                Filter & Urutkan
              </h3>
              <div className='flex flex-wrap gap-3 justify-center md:justify-start'>
                {/* Tombol Urutkan A-Z dipindahkan ke sini */}
                <motion.div
                    key="sort-az"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Badge
                        variant={
                            sortOrder === 'a-z'
                                ? 'default'
                                : 'secondary'
                        }
                        className={`px-4 py-2 cursor-pointer text-sm rounded-full transition-all duration-200 flex items-center gap-2 ${
                            sortOrder === 'a-z'
                                ? 'bg-slate-800 text-white border-slate-800'
                                : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                        }`}
                        onClick={handleSortClick}
                    >
                        <ArrowDownAZ className="w-4 h-4" />
                        A-Z
                    </Badge>
                </motion.div>
                {filters.map((filter) => (
                  <motion.div
                    key={filter}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant={
                        selectedFilters.includes(filter)
                          ? 'default'
                          : 'secondary'
                      }
                      className={`px-4 py-2 cursor-pointer text-sm rounded-full transition-all duration-200 ${
                        selectedFilters.includes(filter)
                          ? 'bg-slate-800 text-white border-slate-800'
                          : 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      }`}
                      onClick={() => handleFilterClick(filter)}
                    >
                      {filter}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className='relative'>
            <div className='relative border border-slate-200 rounded-2xl p-4 sm:p-6 bg-white/50'>
              <div
                ref={scrollContainerRef}
                className='h-[70vh] md:h-[600px] overflow-y-auto scroll-smooth scrollbar-hide'
              >
                {filteredAI.length > 0 ? (
                  <motion.div
                    className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'
                    variants={containerVariants}
                    initial='hidden'
                    animate='visible'
                  >
                    <AnimatePresence>
                      {filteredAI.map((ai) => (
                        <motion.div
                          key={ai.name}
                          variants={itemVariants}
                          className='h-full'
                          initial='hidden'
                          animate='visible'
                          exit='hidden'
                          layout
                        >
                          <Card className='h-full flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300 border-slate-200/80 bg-white group overflow-hidden'>
                            <div className='p-4 md:p-6'>
                              <div className='flex items-start justify-between'>
                                <div
                                  className={`w-12 h-12 md:w-16 md:h-16 ${ai.shape} ${ai.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 p-2`}
                                >
                                   {typeof ai.icon === 'string' ? (
                                    <img src={ai.icon} alt={`${ai.name} logo`} className="w-full h-full object-contain"/>
                                  ) : (
                                    ai.icon
                                  )}
                                </div>
                                <div className='flex flex-col gap-2'>
                                  {ai.tags.map((tag) => (
                                    <Badge
                                      key={tag}
                                      variant='secondary'
                                      className='text-xs self-end'
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <CardTitle className='text-lg md:text-xl pt-2'>
                                {ai.name}
                              </CardTitle>
                              <CardDescription className='pt-1 min-h-[60px] text-sm md:text-base'>
                                {ai.description}
                              </CardDescription>
                            </div>
                            <div className='p-4 md:p-6 pt-0 bg-slate-50/50'>
                              <a
                                href={ai.url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='w-full block'
                              >
                                <Button className='w-full bg-blue-600 hover:bg-blue-700'>
                                  Kunjungi AI
                                  <ArrowRight className='w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1' />
                                </Button>
                              </a>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <div className='flex items-center justify-center h-full min-h-[400px]'>
                    <motion.div
                      className='text-center'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Search className='w-12 h-12 text-slate-400 mx-auto mb-4' />
                      <p className='text-slate-600 text-lg'>
                        Tidak ada opsi yang di pilih...
                      </p>
                      <p className='text-slate-500'>
                        Coba ubah kata kunci atau filter pencarian Anda.
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id='about' className='overflow-hidden'>
        {/* Membangun Masa Depan bersama AI */}
        <div className='relative bg-gradient-to-b from-[#1A2A80] to-[#05091A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-px w-32 h-16 bg-white [clip-path:ellipse(50%_100%_at_50%_0%)]'></div>
          <div className='max-w-7xl mx-auto relative z-10'>
            <motion.div
              className='text-center mb-16'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <h2 className='text-3xl md:text-4xl font-extrabold text-white mb-4'>
                Membangun Masa Depan bersama AI
              </h2>
              <p className='text-lg text-slate-300 max-w-3xl mx-auto'>
                Kami bukan sekadar pengembang; kami adalah para visioner,
                kreator, dan pemecah masalah yang bersatu dalam keyakinan bahwa
                AI adalah kunci untuk membuka potensi tanpa batas.
              </p>
            </motion.div>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              >
                <div className='bg-slate-900/50 rounded-lg shadow-2xl p-4 transform hover:-rotate-2 transition-transform duration-300 border border-slate-700'>
                  <img
                    src='https://placehold.co/600x450/0f172a/94a3b8?text=Inovasi+%26+Kolaborasi'
                    alt='Tim AI Hub Berkolaborasi'
                    className='rounded-md w-full h-auto'
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              >
                <div className='space-y-6'>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center'>
                      <Lightbulb className='w-6 h-6' />
                    </div>
                    <div>
                      <h4 className='font-bold text-lg'>
                        Inovasi Berkelanjutan
                      </h4>
                      <p className='text-slate-300'>
                        Kami senantiasa menjelajahi teknologi terbaru untuk
                        menyajikan alat AI yang paling relevan dan canggih.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0 w-12 h-12 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center'>
                      <Users className='w-6 h-6' />
                    </div>
                    <div>
                      <h4 className='font-bold text-lg'>Kolaborasi Terbuka</h4>
                      <p className='text-slate-300'>
                        Kami percaya bahwa ide terbaik lahir dari kolaborasi.
                        Platform ini kami bangun untuk komunitas dan oleh
                        komunitas.
                      </p>
                    </div>
                  </div>
                  <div className='flex items-start gap-4'>
                    <div className='flex-shrink-0 w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center'>
                      <Accessibility className='w-6 h-6' />
                    </div>
                    <div>
                      <h4 className='font-bold text-lg'>
                        Aksesibilitas untuk Semua
                      </h4>
                      <p className='text-slate-300'>
                        Misi kami adalah mendemokratisasi AI, menjadikannya
                        mudah diakses dan dipahami oleh siapa pun, di mana pun.
                      </p>
                    </div>
                  </div>
                </div>

                <div className='mt-10 flex flex-wrap gap-4'>
                  <Badge className='cursor-pointer text-base bg-teal-400/20 text-teal-300 border border-teal-400/30 hover:bg-teal-400/30'>
                    #PkM
                  </Badge>
                  <Badge className='cursor-pointer text-base bg-teal-400/20 text-teal-300 border border-teal-400/30 hover:bg-teal-400/30'>
                    #AI
                  </Badge>
                  <Badge className='cursor-pointer text-base bg-teal-400/20 text-teal-300 border border-teal-400/30 hover:bg-teal-400/30'>
                    #Unpam
                  </Badge>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tentang Tim Kami Section */}
        <div
          id='team'
          className='relative bg-slate-50 py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-slate-800'
        >
          <div className='absolute inset-0 z-0 opacity-50 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] [background-size:20px_20px]'></div>
          <div className='max-w-7xl mx-auto relative z-10'>
            <div>
              <motion.div
                className='text-center mb-16'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h2 className='text-3xl md:text-4xl font-extrabold text-slate-900 mb-4'>
                  Tentang Team Kami
                </h2>
                <p className='text-lg text-slate-600 max-w-3xl mx-auto'>
                  Kami adalah team mahasiswa yang bersemangat dalam inovasi dan
                  teknologi, berdedikasi untuk menjadikan AI lebih mudah diakses
                  oleh semua kalangan.
                </p>
              </motion.div>
              <motion.div
                className='grid grid-cols-1 md:grid-cols-3 gap-8'
                variants={containerVariants}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.3 }}
              >
                {teamMembers.map((team, index) => (
                  <motion.div
                    key={index}
                    variants={teamCardVariant}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true, amount: 0.5 }}
                    whileHover='hover'
                  >
                    <Card className='shadow-lg h-full overflow-hidden bg-white group'>
                      <div className='relative flex flex-col sm:flex-row items-center p-6 gap-6 text-center sm:text-left bg-white rounded-lg z-10'>
                        <div className='relative flex-shrink-0 w-24 h-24 flex items-center justify-center'>
                          <motion.div
                            className='absolute -inset-2'
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 20,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          >
                            <svg
                              viewBox='0 0 200 200'
                              xmlns='http://www.w3.org/2000/svg'
                              className='w-full h-full'
                              style={{ filter: 'blur(24px)' }}
                            >
                              <defs>
                                <linearGradient
                                  id={`gradient-${index}`}
                                  gradientTransform='rotate(45)'
                                >
                                  <stop
                                    offset='0%'
                                    stopColor={team.auraColors.from}
                                  />
                                  <stop
                                    offset='100%'
                                    stopColor={team.auraColors.to}
                                  />
                                </linearGradient>
                              </defs>
                              <path
                                fill={`url(#gradient-${index})`}
                                d='M45.8,-74.6C59,-67.2,69.1,-54.3,75.7,-40.1C82.3,-25.9,85.4,-10.4,83.4,4.7C81.4,19.8,74.3,34.5,64.6,47.1C55,59.7,42.8,70.2,29,76.5C15.2,82.8,-0.2,84.9,-15.5,82.1C-30.8,79.3,-46,71.6,-57.8,60.2C-69.6,48.8,-78.1,33.8,-80.7,17.7C-83.3,1.6,-80.1,-15.6,-72,-30.7C-63.9,-45.8,-50.9,-58.8,-37.2,-67C-23.5,-75.2,-9.1,-78.6,4.5,-79.8C18.1,-81,32.6,-82,45.8,-74.6Z'
                                transform='translate(100 100)'
                              ></path>
                            </svg>
                          </motion.div>
                          <motion.div
                            className='relative w-full h-full'
                            variants={avatarRotationVariants}
                          >
                            <div
                              className={`w-full h-full rounded-full ${team.bgColor} flex items-center justify-center`}
                            >
                              <Users
                                className={`w-12 h-12 ${team.iconColor}`}
                              />
                            </div>
                          </motion.div>
                        </div>
                        <div className='flex-grow'>
                          <CardTitle className='text-xl'>{team.role}</CardTitle>
                          <div className='text-slate-500 mt-2 space-y-1'>
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
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <div className='flex items-center justify-center md:justify-start mb-4'>
                <Brain className='w-8 h-8 text-blue-400' />
                <span className='ml-2 text-xl font-bold'>Proyek PKM</span>
              </div>
              <p className='text-gray-400'>
                Platform terdepan untuk menemukan dan memanfaatkan alat AI
                terbaik.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className='text-lg font-semibold mb-4'>Tautan Cepat</h3>
              <ul className='space-y-2'>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href='#home'
                    onClick={(e) => handleScroll(e, 'home')}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Beranda
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href='#ai-edu'
                    onClick={(e) => handleScroll(e, 'ai-edu')}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Edukasi AI
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href='#category'
                    onClick={(e) => handleScroll(e, 'category')}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Kategori
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href='#about'
                    onClick={(e) => handleScroll(e, 'about')}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Tentang Kami
                  </a>
                </motion.li>
                <motion.li
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href='#team'
                    onClick={(e) => handleScroll(e, 'team')}
                    className='text-gray-400 hover:text-white transition-colors'
                  >
                    Team Kami
                  </a>
                </motion.li>
              </ul>
            </motion.div>
            <motion.div variants={itemVariants}>
              <h3 className='text-lg font-semibold mb-4'>Ikuti Kami</h3>
              <div className='flex space-x-4 justify-center md:justify-start'>
                <motion.a
                  href='https://www.instagram.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-white'
                  aria-label='Instagram'
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Instagram className='w-6 h-6' />
                </motion.a>
                <motion.a
                  href='https://www.twitter.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-white'
                  aria-label='Twitter'
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Twitter className='w-6 h-6' />
                </motion.a>
                <motion.a
                  href='https://www.facebook.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-white'
                  aria-label='Facebook'
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Facebook className='w-6 h-6' />
                </motion.a>
                <motion.a
                  href='https://www.github.com/'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-gray-400 hover:text-white'
                  aria-label='Github'
                  whileHover={{ scale: 1.2, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Github className='w-6 h-6' />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>&copy; 2025 Proyek PKM. Hak Cipta Dilindungi.</p>
          </motion.div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={scrollToTop}
            className='fixed bottom-8 right-8 bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className='w-6 h-6' />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
