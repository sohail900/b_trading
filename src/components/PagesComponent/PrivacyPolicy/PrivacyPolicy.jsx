'use client'
import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '@/components/Breadcrumb/BreadcrumbComponent'
import { t } from '@/utils'
import parse, { domToReact } from 'html-react-parser'
import Link from 'next/link'
import { frontendSettingsApi } from '@/utils/api'
import { useSelector } from 'react-redux'
import { CurrentLanguageData } from '@/redux/reuducer/languageSlice'
import Loader from '@/components/Loader/Loader'

const PrivacyPolicy = () => {
    const [privacyPolicy, setPrivacyPolicy] = useState({})
    const [isLoading, setisLoading] = useState(true)
    const lang = useSelector(CurrentLanguageData)

    const getPrivacyPolicyData = async () => {
        const language_code = lang.code
        try {
            const response = await frontendSettingsApi.getFrontendSetting({
                type: 'privacy-policy',
                language_code,
            })
            const data = response.data.data
            setPrivacyPolicy(data)
        } catch (e) {
            console.log(e)
        } finally {
            setisLoading(false)
        }
    }

    useEffect(() => {
        getPrivacyPolicyData()
    }, [lang.code])

    const options = {
        replace: (domNode) => {
            // Check if the node is an anchor tag <a>
            if (
                domNode.name === 'a' &&
                domNode.attribs &&
                domNode.attribs.href
            ) {
                const { href, ...otherAttribs } = domNode.attribs
                return (
                    <Link href={href} {...otherAttribs} className='blog_link'>
                        {domToReact(domNode.children)}
                    </Link>
                )
            }
        },
    }

    return (
        <section className='aboutus'>
            <BreadcrumbComponent title2={t('privacyPolicy')} />
            {isLoading ? (
                <Loader />
            ) : (
                <div className='container'>
                    <div className='page_content'>
                        {parse(privacyPolicy.value || '', options)}
                    </div>
                </div>
            )}
        </section>
    )
}

export default PrivacyPolicy
