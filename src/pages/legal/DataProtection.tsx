import React from 'react'
import SEO from '../../components/SEO'

export default function DataProtection(){
  return (
    <div>
      <SEO title="Data Protection & Compliance" description="Data protection, compliance and controls at Zwanski Tech — GDPR, CCPA, retention and incident response guidance." image={`${(import.meta as any).env?.BASE_URL || '/'}logo.svg`.replace(/\/\//g,'/')} url={'https://zwanski01.github.io/zwanski-store/legal/data-protection'} />
      <h1 className='text-3xl font-bold mb-4'>Data Protection & Compliance</h1>

      <section className='mt-4'>
        <h2 className='font-semibold'>Scope</h2>
        <p className='text-gray-700 mt-2'>This page describes Zwanski Tech's approach to data protection, processing principles, retention, and compliance controls. It is designed for technical and legal stakeholders evaluating our processes.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Processing Principles</h3>
        <ul className='list-disc ml-6 text-gray-700 mt-2'>
          <li>Lawfulness, fairness and transparency</li>
          <li>Purpose limitation and data minimization</li>
          <li>Accuracy and retention limitation</li>
          <li>Integrity and confidentiality via appropriate security measures</li>
        </ul>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Retention & Deletion</h3>
        <p className='text-gray-700 mt-2'>We retain personal data only as long as necessary for the purpose it was collected, or as required by law. For customers, retention schedules are agreed contractually. For this demo, user data is kept in-browser and can be removed by clearing storage.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Security Controls</h3>
        <p className='text-gray-700 mt-2'>Zwanski Tech follows industry best practices: encryption in transit, minimal access controls, logging, and role-based access. Regular audits and vulnerability scans form part of our compliance posture.</p>
      </section>

      <section className='mt-4'>
        <h3 className='font-semibold'>Incident Response & Breach Notification</h3>
        <p className='text-gray-700 mt-2'>In the event of a security incident, we follow an internal incident response process with containment, root cause analysis, and notification to affected parties where required by law.</p>
      </section>

    </div>
  )
}
