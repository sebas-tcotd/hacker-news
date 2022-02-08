'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">hacker-news documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-125f67469abd8ed030e6fd1a7a616c87b99aff43c438aac41876e9b7c9302880ccdac1531c624c46a603d612c8ae1033d7b99cf323437c6e0e8bd933838894bb"' : 'data-target="#xs-components-links-module-AppModule-125f67469abd8ed030e6fd1a7a616c87b99aff43c438aac41876e9b7c9302880ccdac1531c624c46a603d612c8ae1033d7b99cf323437c6e0e8bd933838894bb"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-125f67469abd8ed030e6fd1a7a616c87b99aff43c438aac41876e9b7c9302880ccdac1531c624c46a603d612c8ae1033d7b99cf323437c6e0e8bd933838894bb"' :
                                            'id="xs-components-links-module-AppModule-125f67469abd8ed030e6fd1a7a616c87b99aff43c438aac41876e9b7c9302880ccdac1531c624c46a603d612c8ae1033d7b99cf323437c6e0e8bd933838894bb"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PagesModule.html" data-type="entity-link" >PagesModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PagesModule-154bc9de4562e3269c31ae4799d3ed75615de9258a51970b2355db8ee96bf2a0a00aa89f99c4cfccfd7d5bd011a4d18d9ff5e95fb92b3e0419cb5ec615b0bd72"' : 'data-target="#xs-components-links-module-PagesModule-154bc9de4562e3269c31ae4799d3ed75615de9258a51970b2355db8ee96bf2a0a00aa89f99c4cfccfd7d5bd011a4d18d9ff5e95fb92b3e0419cb5ec615b0bd72"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PagesModule-154bc9de4562e3269c31ae4799d3ed75615de9258a51970b2355db8ee96bf2a0a00aa89f99c4cfccfd7d5bd011a4d18d9ff5e95fb92b3e0419cb5ec615b0bd72"' :
                                            'id="xs-components-links-module-PagesModule-154bc9de4562e3269c31ae4799d3ed75615de9258a51970b2355db8ee96bf2a0a00aa89f99c4cfccfd7d5bd011a4d18d9ff5e95fb92b3e0419cb5ec615b0bd72"' }>
                                            <li class="link">
                                                <a href="components/AllComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AllComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DropdownComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DropdownComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FavsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FavsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HomeComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PagesRoutingModule.html" data-type="entity-link" >PagesRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedModule.html" data-type="entity-link" >SharedModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' : 'data-target="#xs-components-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' :
                                            'id="xs-components-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' }>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeadlineComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeadlineComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' : 'data-target="#xs-pipes-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' :
                                            'id="xs-pipes-links-module-SharedModule-206bbb8b61b765ab50d37c59661c38e50df7f54c28e209d1dc97e090821251a89ced23915bda7e1d643f2071482b682df6c3d4a0f532bdef6dff38126a7b6db3"' }>
                                            <li class="link">
                                                <a href="pipes/TimeAgoPipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TimeAgoPipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/FilterService.html" data-type="entity-link" >FilterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HeadlineService.html" data-type="entity-link" >HeadlineService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsService.html" data-type="entity-link" >NewsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Headline.html" data-type="entity-link" >Headline</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/News.html" data-type="entity-link" >News</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NewsResponse.html" data-type="entity-link" >NewsResponse</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});