# Learnings in using HTMX

## Single Page Application using HTMX

For my farm management application I emulate a single page application by using HTMX to replace a main window container with the required page content. 
An ExecuteHTMXTemplate function will either render a full page with header, nagiviaton and foot components if navigated to directly, or if a HTMX request is received only render the content to be swapped. 

```
// ExecuteTemplates executes templates for HTMX requests
// check if hx-request is true
// if true, execute the page template
// if false, execute the header and navigation templates as well as the page template
func ExecuteHTMXTemplates(w http.ResponseWriter, r *http.Request, data any, page string) error {
	log.Printf("Executing htmx templates: %v", page)

	tmpl := GetTemplates()

	if r.Header.Get("HX-Request") == "true" {
		log.Printf("HX-Request is true, executing template: %v", page)
		err := tmpl.ExecuteTemplate(w, page, data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Printf("Error executing template: %v", err)
			return err
		}
	} else {
		err := tmpl.ExecuteTemplate(w, "header", data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Printf("Error executing template: %v", err)
			return err
		}
		err = tmpl.ExecuteTemplate(w, "navigation", data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Printf("Error executing template: %v", err)
			return err
		}
		err = tmpl.ExecuteTemplate(w, page, data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Printf("Error executing template: %v", err)
			return err
		}
		err = tmpl.ExecuteTemplate(w, "footer", data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			log.Printf("Error executing template: %v", err)
			return err
		}
	}
	return nil
}
```

The navigation template with the top navigation bar and sidebar ends with the creation of the "main-content" main element:
```
<!-- Main Content Area -->
<main id="main-content" class="main-content ml-0 sm:ml-8 pt-16">
{{ end }}
```
and the footer template closes the main 
```
{{define "footer"}}
</main>
<footer class="bg-white shadow-sm mt-8">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="text-center">
            <p class="text-gray-600">&copy; 2024 Russell Oliver</p>
        </div>
    </div>
</footer>
</body>
<script src="/static/js/main.js"></script>
<!-- Custom JS -->
</html>
{{end}}```


Navigation links then will target the "main-content" and swap the innerHTML

```
<li>
    <a hx-target="#main-content" hx-get="/dashboard"
        class="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        Dashboard
    </a>
</li>
```


