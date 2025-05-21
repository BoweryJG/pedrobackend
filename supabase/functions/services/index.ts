// supabase/functions/services/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7'
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create a Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const url = new URL(req.url)
    const path = url.pathname.split('/')
    const action = path[path.length - 1]
    
    let data
    let error

    if (req.method === 'GET') {
      if (action === 'services') {
        // Get all services
        const { data: services, error: servicesError } = await supabase
          .from('services')
          .select('*')
          .order('name', { ascending: true })

        data = services
        error = servicesError
      } 
      else if (action === 'yomi-features') {
        // Get yomi technology features
        const { data: yomiFeatures, error: yomiError } = await supabase
          .from('yomi_features')
          .select('*')

        data = yomiFeatures
        error = yomiError
      }
      else if (action === 'staff') {
        // Get staff information
        const { data: staff, error: staffError } = await supabase
          .from('staff')
          .select('*')
          .order('last_name', { ascending: true })

        data = staff
        error = staffError
      }
      else if (action === 'testimonials') {
        // Get approved testimonials
        const { data: testimonials, error: testimonialsError } = await supabase
          .from('testimonials')
          .select(`
            id,
            rating,
            comment,
            created_at,
            patients (
              first_name,
              last_name
            ),
            services (
              name,
              category
            )
          `)
          .eq('is_approved', true)
          .order('created_at', { ascending: false })

        data = testimonials
        error = testimonialsError
      }
      else {
        // Get specific service by ID
        const serviceId = action
        const { data: service, error: serviceError } = await supabase
          .from('services')
          .select('*')
          .eq('id', serviceId)
          .single()

        data = service
        error = serviceError
      }
    } else {
      error = { message: 'Method not allowed' }
    }

    return new Response(
      JSON.stringify({
        data,
        error,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: error ? 400 : 200,
      },
    )
  } catch (err) {
    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    )
  }
})
