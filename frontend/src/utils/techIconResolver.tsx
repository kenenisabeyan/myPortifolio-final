import React from 'react'
import { 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress, 
  SiPython, 
  SiDjango, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiPostgresql, 
  SiMongodb, 
  SiCplusplus, 
  SiDocker, 
  SiGit, 
  SiGithub, 
  SiFastapi, 
  SiTensorflow, 
  SiPytorch, 
  SiKeras, 
  SiScikitlearn, 
  SiSelenium, 
  SiBootstrap, 
  SiFramer, 
  SiThreedotjs, 
  SiVite, 
  SiPrisma, 
  SiRedis, 
  SiGraphql, 
  SiKubernetes, 
  SiVercel, 
  SiRust, 
  SiGo, 
  SiPhp, 
  SiLaravel, 
  SiRuby, 
  SiSwift, 
  SiFlutter,
  SiHtml5,
  SiCsswizardry,
  SiMysql,
  SiSqlite
} from 'react-icons/si'
import { FaJava, FaServer, FaDatabase, FaCode, FaTerminal, FaLayerGroup } from 'react-icons/fa'

export interface TechMetaData {
  name: string
  icon: React.ReactNode
  color: string
}

export const resolveTechIcon = (techName: string, iconSize: number = 18): TechMetaData => {
  const cleanName = techName.toLowerCase().trim()

  if (cleanName.includes('react')) {
    return { name: techName, icon: <SiReact size={iconSize} className="text-[#61DAFB]" />, color: '#61DAFB' }
  }
  if (cleanName.includes('next')) {
    return { name: techName, icon: <SiNextdotjs size={iconSize} className="text-white" />, color: '#ffffff' }
  }
  if (cleanName.includes('python')) {
    return { name: techName, icon: <SiPython size={iconSize} className="text-[#3776AB]" />, color: '#3776AB' }
  }
  if (cleanName.includes('django')) {
    return { name: techName, icon: <SiDjango size={iconSize} className="text-[#44B78B]" />, color: '#44B78B' }
  }
  if (cleanName.includes('node')) {
    return { name: techName, icon: <SiNodedotjs size={iconSize} className="text-[#339933]" />, color: '#339933' }
  }
  if (cleanName.includes('express')) {
    return { name: techName, icon: <SiExpress size={iconSize} className="text-[#000000] dark:text-[#ffffff]" />, color: '#ffffff' }
  }
  if (cleanName.includes('typescript') || cleanName === 'ts') {
    return { name: techName, icon: <SiTypescript size={iconSize} className="text-[#3178C6]" />, color: '#3178C6' }
  }
  if (cleanName.includes('javascript') || cleanName === 'js') {
    return { name: techName, icon: <SiJavascript size={iconSize} className="text-[#F7DF1E]" />, color: '#F7DF1E' }
  }
  if (cleanName.includes('tailwind')) {
    return { name: techName, icon: <SiTailwindcss size={iconSize} className="text-[#38B2AC]" />, color: '#38B2AC' }
  }
  if (cleanName.includes('postgres') || cleanName.includes('pg')) {
    return { name: techName, icon: <SiPostgresql size={iconSize} className="text-[#4169E1]" />, color: '#4169E1' }
  }
  if (cleanName.includes('mongo')) {
    return { name: techName, icon: <SiMongodb size={iconSize} className="text-[#47A248]" />, color: '#47A248' }
  }
  if (cleanName.includes('c++') || cleanName.includes('cpp')) {
    return { name: techName, icon: <SiCplusplus size={iconSize} className="text-[#00599C]" />, color: '#00599C' }
  }
  if (cleanName.includes('java') && !cleanName.includes('script')) {
    return { name: techName, icon: <FaJava size={iconSize} className="text-[#f89820]" />, color: '#f89820' }
  }
  if (cleanName.includes('docker')) {
    return { name: techName, icon: <SiDocker size={iconSize} className="text-[#2496ED]" />, color: '#2496ED' }
  }
  if (cleanName.includes('github')) {
    return { name: techName, icon: <SiGithub size={iconSize} className="text-white" />, color: '#ffffff' }
  }
  if (cleanName.includes('git')) {
    return { name: techName, icon: <SiGit size={iconSize} className="text-[#F05032]" />, color: '#F05032' }
  }
  if (cleanName.includes('fastapi')) {
    return { name: techName, icon: <SiFastapi size={iconSize} className="text-[#009688]" />, color: '#009688' }
  }
  if (cleanName.includes('prisma')) {
    return { name: techName, icon: <SiPrisma size={iconSize} className="text-[#2D3748]" />, color: '#2D3748' }
  }
  if (cleanName.includes('redis')) {
    return { name: techName, icon: <SiRedis size={iconSize} className="text-[#DC382D]" />, color: '#DC382D' }
  }
  if (cleanName.includes('graphql')) {
    return { name: techName, icon: <SiGraphql size={iconSize} className="text-[#E10098]" />, color: '#E10098' }
  }
  if (cleanName.includes('kubernet')) {
    return { name: techName, icon: <SiKubernetes size={iconSize} className="text-[#326CE5]" />, color: '#326CE5' }
  }
  if (cleanName.includes('vercel')) {
    return { name: techName, icon: <SiVercel size={iconSize} className="text-white" />, color: '#ffffff' }
  }
  if (cleanName.includes('rust')) {
    return { name: techName, icon: <SiRust size={iconSize} className="text-[#DEA584]" />, color: '#DEA584' }
  }
  if (cleanName.includes('go') || cleanName.includes('golang')) {
    return { name: techName, icon: <SiGo size={iconSize} className="text-[#00ADD8]" />, color: '#00ADD8' }
  }
  if (cleanName.includes('php')) {
    return { name: techName, icon: <SiPhp size={iconSize} className="text-[#777BB4]" />, color: '#777BB4' }
  }
  if (cleanName.includes('laravel')) {
    return { name: techName, icon: <SiLaravel size={iconSize} className="text-[#FF2D20]" />, color: '#FF2D20' }
  }
  if (cleanName.includes('flutter')) {
    return { name: techName, icon: <SiFlutter size={iconSize} className="text-[#02569B]" />, color: '#02569B' }
  }
  if (cleanName.includes('html')) {
    return { name: techName, icon: <SiHtml5 size={iconSize} className="text-[#E34F26]" />, color: '#E34F26' }
  }
  if (cleanName.includes('css')) {
    return { name: techName, icon: <SiCsswizardry size={iconSize} className="text-[#1572B6]" />, color: '#1572B6' }
  }
  if (cleanName.includes('mysql')) {
    return { name: techName, icon: <SiMysql size={iconSize} className="text-[#4479A1]" />, color: '#4479A1' }
  }
  if (cleanName.includes('sqlite')) {
    return { name: techName, icon: <SiSqlite size={iconSize} className="text-[#003B57]" />, color: '#003B57' }
  }
  if (cleanName.includes('three') || cleanName.includes('3d')) {
    return { name: techName, icon: <SiThreedotjs size={iconSize} className="text-white" />, color: '#ffffff' }
  }
  if (cleanName.includes('framer') || cleanName.includes('motion')) {
    return { name: techName, icon: <SiFramer size={iconSize} className="text-[#0055FF]" />, color: '#0055FF' }
  }
  if (cleanName.includes('vite')) {
    return { name: techName, icon: <SiVite size={iconSize} className="text-[#646CFF]" />, color: '#646CFF' }
  }

  // Fallback for general tech categories
  if (cleanName.includes('data') || cleanName.includes('sql') || cleanName.includes('db')) {
    return { name: techName, icon: <FaDatabase size={iconSize} className="text-cyan-400" />, color: '#22d3ee' }
  }
  if (cleanName.includes('api') || cleanName.includes('server') || cleanName.includes('backend')) {
    return { name: techName, icon: <FaServer size={iconSize} className="text-cyan-400" />, color: '#22d3ee' }
  }

  return { name: techName, icon: <FaCode size={iconSize} className="text-cyan-400" />, color: '#22d3ee' }
}

export const DynamicTechBadge: React.FC<{ name: string; size?: number; className?: string }> = ({ name, size = 14, className = "" }) => {
  const meta = resolveTechIcon(name, size)
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-gray-200 ${className}`}>
      {meta.icon}
      <span>{meta.name}</span>
    </span>
  )
}
