.PHONY: help docker-up docker-down

help: ## This help dialog.
	@IFS=$$'\n' ; \
	help_lines=(`fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//'`); \
	for help_line in $${help_lines[@]}; do \
		IFS=$$'#' ; \
		help_split=($$help_line) ; \
		help_command=`echo $${help_split[0]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		help_info=`echo $${help_split[2]} | sed -e 's/^ *//' -e 's/ *$$//'` ; \
		printf "%-30s %s\n" $$help_command $$help_info ; \
	done

docker-up: ## Start docker containers
	@echo "|- Starting docker containers -|"
	@cd docker && docker-compose up -d
	@echo "✅ Docker containers started successfully"

docker-down: ## Stop docker containers
	@echo "|- Stopping docker containers -|"
	@docker rm -f $$(docker ps -aq)
	@echo "✅ Docker containers stopped successfully"